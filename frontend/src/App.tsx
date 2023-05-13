import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_ROOT: string = import.meta.env.VITE_API_ROOT;
const MEDIA_ROOT: string = import.meta.env.VITE_MEDIA_ROOT;

function App() {
  const [videoSource, setVideoSource] = useState(`${MEDIA_ROOT}welcome`);
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
        src={videoSource}
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
        <MenuItem
          url=""
          setVideoSource={setVideoSource}
        ></MenuItem>
      </menu>
    </nav>
  );
}

function MenuItem({
  url,
  setVideoSource,
}: {
  url: string;
  setVideoSource: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { isLoading, data: { data } = {} } = useQuery({
    queryKey: ['media', url],
    queryFn: () => axios.get(API_ROOT, { params: { dir: url } }),
  });

  if (isLoading) return <>Loading...</>;

  return <span>{JSON.stringify(data)}</span>;
}

export default App;
