import { useState } from 'react';

function App() {
  const [videoSource, setVideoSource] = useState(
    'http://localhost:55000/Popcorn%20Time/Devotion/Devotion.mkv',
  );
  return (
    <div className="h-screen bg-gray-900 text-gray-400">
      <MainPanel videoSource={videoSource} />
    </div>
  );
}

function MainPanel({ videoSource }: { videoSource: string }) {
  return (
    <div className="text-center">
      <h1 className="p-10 text-4xl font-bold">Pi Player</h1>
      <video
        className="m-auto h-40 w-60 border-4 border-gray-400"
        src={videoSource}
        controls
      >
        Video should play here
      </video>
    </div>
  );
}

export default App;
