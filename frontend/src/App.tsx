import { Suspense, useState } from 'react';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_ROOT: string = import.meta.env.VITE_API_ROOT;
const MEDIA_ROOT: string = import.meta.env.VITE_MEDIA_ROOT;

function App() {
  const [videoSource, setVideoSource] = useState('welcome');
  return (
    <div className="h-screen bg-gray-900 text-gray-400">
      <MainPanel videoSource={videoSource} />
      <SideBar setVideoSource={setVideoSource} />
    </div>
  );
}

function MainPanel({ videoSource }: { videoSource: string }) {
  return (
    <main className="fixed right-0 w-3/4 text-center">
      <h1 className="p-10 text-4xl font-bold">Pi Player</h1>
      <video
        className="m-auto h-40 w-60 border-4 border-gray-400"
        src={`${MEDIA_ROOT}${videoSource}`}
        controls
      >
        Video should play here
      </video>
    </main>
  );
}

function SideBar({
  setVideoSource,
}: {
  setVideoSource: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <nav className="fixed left-0 top-0 h-screen w-1/4 border-r-4 border-gray-400">
      <menu role="tree">
        <Suspense fallback={<>Loading...</>}>
          <MenuItem
            item={{ name: 'top', type: 'directory', url: '' }}
            setVideoSource={setVideoSource}
            isTopLevel
          />
        </Suspense>
      </menu>
    </nav>
  );
}

interface mediaItem {
  name: string;
  type: 'directory' | 'file';
  url: string;
}

function MenuItem({
  item: { name, type, url },
  setVideoSource,
  isTopLevel = false,
}: {
  item: mediaItem;
  setVideoSource: React.Dispatch<React.SetStateAction<string>>;
  isTopLevel: boolean;
}) {
  const [expanded, setExpanded] = useState(isTopLevel);
  const {
    data: { data } = { data: [] },
  }: UseQueryResult<{ data: mediaItem[] }> = useQuery({
    queryKey: ['media', url],
    queryFn: () => axios.get(API_ROOT, { params: { dir: url } }),
    enabled: expanded,
  });

  return (
    <div
      className="ml-5"
      key={url}
      role="menuitem"
    >
      {type === 'directory' ? (
        <>
          <input
            id={url || name}
            type="checkbox"
            checked={expanded}
            onChange={() => setExpanded((prev) => !prev)}
          />
          <label htmlFor={url || name}>{name}</label>
          {expanded && (
            <>
              {data.map((item) => (
                <Suspense fallback={<>Loading...</>}>
                  <MenuItem
                    item={item}
                    setVideoSource={setVideoSource}
                    isTopLevel={false}
                  />
                </Suspense>
              ))}
            </>
          )}
        </>
      ) : (
        <>
          <input
            type="radio"
            name="videoSource"
            id={url}
            value={url}
            onChange={() => setVideoSource(url)}
          />
          <label htmlFor={url}>{name}</label>
        </>
      )}
    </div>
  );
}

export default App;
