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
  const [queue, setQueue] = useState(['welcome']);
  const [queuePosition, setQueuePosition] = useState(0);

  const videoSource = queue[queuePosition];

  const addToQueue = (url: string) => setQueue((prev) => [...prev, url]);
  const skipToNext = () => setQueuePosition((prev) => ++prev % queue.length);

  return (
    <div className="h-screen text-gray-400">
      <MainPanel
        videoSource={videoSource}
        skipToNext={skipToNext}
      />
      <SideBar
        addToQueue={addToQueue}
        videoSource={videoSource}
      />
    </div>
  );
}

function MainPanel({
  videoSource,
  skipToNext,
}: {
  videoSource: string;
  skipToNext: () => void;
}) {
  return (
    <main className="fixed right-0 w-3/4 text-center">
      <h1 className="p-10 text-4xl font-bold">Pi Player</h1>
      <video
        className="m-auto w-7/12 border-4 border-gray-400"
        src={`${MEDIA_ROOT}${videoSource}`}
        onEnded={skipToNext}
        controls
        autoPlay
      >
        Video should play here
      </video>
      <div className="flex justify-center gap-32 pt-10 text-6xl">
        <button className="h-12 w-12 overflow-hidden rounded-full">
          <div className="-ml-2 -mt-1.5">⏪</div>
        </button>
        <button
          className="h-12 w-12 overflow-hidden rounded-full"
          onClick={skipToNext}
        >
          <div className="-ml-1 -mt-1.5">⏩</div>
        </button>
      </div>
    </main>
  );
}

function SideBar({
  addToQueue,
  videoSource,
}: {
  addToQueue: (url: string) => void;
  videoSource: string;
}) {
  return (
    <nav className="fixed left-0 top-0 h-screen w-1/4 resize-x overflow-auto whitespace-nowrap border-r-4 border-gray-400 px-2 py-1">
      <menu role="tree">
        <Suspense fallback={<>Loading...</>}>
          <MenuItem
            item={{ name: 'top', type: 'directory', url: '' }}
            addToQueue={addToQueue}
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
  addToQueue,
  videoSource,
  isTopLevel = false,
}: {
  item: MediaItem;
  addToQueue: (url: string) => void;
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
          addToQueue={addToQueue}
          videoSource={videoSource}
        />
      )}
      <MenuItemChildren
        data={data}
        addToQueue={addToQueue}
        videoSource={videoSource}
        isTopLevel={isTopLevel}
        hidden={!expanded}
      />
    </>
  );
}

function MenuItemChildren({
  data,
  addToQueue,
  videoSource,
  isTopLevel,
  hidden,
}: {
  data: MediaItem[];
  addToQueue: (url: string) => void;
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
              addToQueue={addToQueue}
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
  addToQueue,
  videoSource,
}: {
  item: MediaItem;
  expanded: boolean;
  setExpanded?: React.Dispatch<React.SetStateAction<boolean>>;
  addToQueue?: (url: string) => void;
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
        onChange={() => addToQueue?.(url)}
      />
      <span
        className={
          videoSource === url
            ? "inline-block animate-bounce before:content-['🔸']"
            : "inline-block before:content-['🔸']"
        }
      ></span>
      {` ${name}`}
    </label>
  );
}

export type { MediaItem };

export default App;
