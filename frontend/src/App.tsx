import { Suspense, useState } from 'react';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_ROOT: string = import.meta.env.VITE_API_ROOT;
const MEDIA_ROOT: string = import.meta.env.VITE_MEDIA_ROOT;

interface MediaItem {
  name: string;
  type: 'directory' | 'file';
  url: string;
}

function App() {
  const [videoSource, setVideoSource] = useState('welcome');
  return (
    <div className="h-screen text-gray-400">
      <MainPanel videoSource={videoSource} />
      <SideBar
        setVideoSource={setVideoSource}
        videoSource={videoSource}
      />
    </div>
  );
}

function MainPanel({ videoSource }: { videoSource: string }) {
  return (
    <main className="fixed right-0 w-3/4 text-center">
      <h1 className="p-10 text-4xl font-bold">Pi Player</h1>
      <video
        className="m-auto w-7/12 border-4 border-gray-400"
        src={`${MEDIA_ROOT}${videoSource}`}
        controls
        autoPlay
      >
        Video should play here
      </video>
    </main>
  );
}

function SideBar({
  setVideoSource,
  videoSource,
}: {
  setVideoSource: React.Dispatch<React.SetStateAction<string>>;
  videoSource: string;
}) {
  return (
    <nav className="fixed left-0 top-0 h-screen w-1/4 resize-x overflow-auto whitespace-nowrap border-r-4 border-gray-400 px-2 py-1">
      <menu role="tree">
        <Suspense fallback={<>Loading...</>}>
          <MenuItem
            item={{ name: 'top', type: 'directory', url: '' }}
            setVideoSource={setVideoSource}
            videoSource={videoSource}
            isTopLevel
          />
        </Suspense>
      </menu>
    </nav>
  );
}

function MenuItem({
  item,
  setVideoSource,
  videoSource,
  isTopLevel = false,
}: {
  item: MediaItem;
  setVideoSource: React.Dispatch<React.SetStateAction<string>>;
  videoSource: string;
  isTopLevel?: boolean;
}) {
  const [expanded, setExpanded] = useState(isTopLevel);

  const {
    data: { data } = { data: [] },
  }: UseQueryResult<{ data: MediaItem[] }> = useQuery({
    queryKey: ['media', item.url],
    queryFn: () => axios.get(API_ROOT, { params: { dir: item.url } }),
    staleTime: 300_000,
    useErrorBoundary: false,
    enabled: expanded && item.type === 'directory',
  });

  return (
    <>
      {!isTopLevel && (
        <MenuItemHeader
          item={item}
          expanded={expanded}
          setExpanded={setExpanded}
          setVideoSource={setVideoSource}
          videoSource={videoSource}
        />
      )}
      <MenuItemChildren
        data={data}
        setVideoSource={setVideoSource}
        videoSource={videoSource}
        isTopLevel={isTopLevel}
        hidden={!expanded}
      />
    </>
  );
}

function MenuItemChildren({
  data,
  setVideoSource,
  videoSource,
  isTopLevel,
  hidden,
}: {
  data: MediaItem[];
  setVideoSource: React.Dispatch<React.SetStateAction<string>>;
  videoSource: string;
  isTopLevel?: boolean;
  hidden?: boolean;
}) {
  return (
    <>
      {data.map((item) => (
        <div
          className={isTopLevel ? undefined : 'ml-5'}
          key={item.url}
          hidden={hidden}
        >
          <Suspense
            fallback={
              <MenuItemHeader
                item={{ ...item, name: `${item.name}...` }}
                videoSource={videoSource}
                expanded
              />
            }
          >
            <MenuItem
              item={item}
              setVideoSource={setVideoSource}
              videoSource={videoSource}
            />
          </Suspense>
        </div>
      ))}
    </>
  );
}

function MenuItemHeader({
  item: { name, type, url },
  expanded,
  setExpanded,
  setVideoSource,
  videoSource,
}: {
  item: MediaItem;
  expanded: boolean;
  setExpanded?: React.Dispatch<React.SetStateAction<boolean>>;
  setVideoSource?: React.Dispatch<React.SetStateAction<string>>;
  videoSource: string;
}) {
  return type === 'directory' ? (
    <label
      className={expanded ? "before:content-['⏷_']" : "before:content-['⏵_']"}
    >
      <input
        className="hidden"
        id={url}
        type="checkbox"
        role="treeitem"
        checked={expanded}
        onChange={() => setExpanded?.((prev) => !prev)}
      />
      {name}
    </label>
  ) : (
    <label>
      <input
        className="hidden"
        id={url}
        type="radio"
        role="treeitem"
        name="videoSource"
        value={url}
        onChange={() => setVideoSource?.(url)}
      />
      <span
        className={`inline-block ${
          videoSource === url ? 'animate-bounce ' : ''
        }before:content-['🎵']`}
      ></span>
      {name}
    </label>
  );
}

export type { MediaItem };

export default App;
