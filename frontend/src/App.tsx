import { Suspense, createContext, useContext, useState } from 'react';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

const API_ROOT: string = import.meta.env.VITE_API_ROOT;
const MEDIA_ROOT: string = import.meta.env.VITE_MEDIA_ROOT;

export const queryFn: (
  url: string,
  {
    params: { dir },
  }: { params: { dir: string } },
) => Promise<{ data: MediaItem[] | AxiosError }> = (url, config) =>
  axios.get(url, config);

export const QueryContext = createContext({ queryFn });

function App() {
  const [videoSource, setVideoSource] = useState('welcome');
  return (
    <div className="h-screen text-gray-400">
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
}: {
  setVideoSource: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <nav className="fixed left-0 top-0 h-screen w-1/4 resize-x overflow-auto whitespace-nowrap border-r-4 border-gray-400 px-2 py-1">
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

export interface MediaItem {
  name: string;
  type: 'directory' | 'file';
  url: string;
}

function MenuItem({
  item,
  setVideoSource,
  isTopLevel = false,
}: {
  item: MediaItem;
  setVideoSource: React.Dispatch<React.SetStateAction<string>>;
  isTopLevel?: boolean;
}) {
  const [expanded, setExpanded] = useState(isTopLevel);
  const { queryFn } = useContext(QueryContext);

  const {
    data: { data } = { data: [] },
  }: UseQueryResult<{ data: MediaItem[] }> | { data: { data: MediaItem[] } } =
    item.type === 'directory'
      ? useQuery({
          queryKey: ['media', item.url],
          queryFn: () => queryFn(API_ROOT, { params: { dir: item.url } }),
          useErrorBoundary: false,
          enabled: expanded,
        })
      : { data: { data: [] } };

  return isTopLevel ? (
    <MenuItemChildren
      data={data}
      setVideoSource={setVideoSource}
      isTopLevel
    />
  ) : (
    <>
      <MenuItemHeader
        item={item}
        expanded={expanded}
        setExpanded={setExpanded}
        setVideoSource={setVideoSource}
      />
      <MenuItemChildren
        data={data}
        setVideoSource={setVideoSource}
        hidden={!expanded}
      />
    </>
  );
}

function MenuItemChildren({
  data,
  setVideoSource,
  isTopLevel,
  hidden,
}: {
  data: MediaItem[];
  setVideoSource: React.Dispatch<React.SetStateAction<string>>;
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
              <>
                <MenuItemHeader
                  item={item}
                  expanded
                />
                ...
              </>
            }
          >
            <MenuItem
              item={item}
              setVideoSource={setVideoSource}
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
}: {
  item: MediaItem;
  expanded: boolean;
  setExpanded?: React.Dispatch<React.SetStateAction<boolean>>;
  setVideoSource?: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <>
      {type === 'directory' ? (
        <input
          id={url}
          type="checkbox"
          role="treeitem"
          checked={expanded}
          onChange={() => setExpanded?.((prev) => !prev)}
        />
      ) : (
        <input
          id={url}
          type="radio"
          role="treeitem"
          name="videoSource"
          value={url}
          onChange={() => setVideoSource?.(url)}
        />
      )}
      <label
        htmlFor={url}
        className="ml-2"
      >
        {name}
      </label>
    </>
  );
}

export default App;
