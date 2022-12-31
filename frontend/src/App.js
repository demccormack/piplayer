import './App.css';
import Navbar from './Navbar.js';
import Player from './Player.js';
import { useState } from 'react';

const App = () => {
  const [playUrl, setPlayUrl] = useState('welcome');

  const handleRadioButtonChange = () => {
    const url = document.querySelector('input[name="file"]:checked').value;
    setPlayUrl(url);
  };

  return (
    <div>
      <Navbar onRadioButtonChange={handleRadioButtonChange} />
      <div id='main'>
        <h1>Pi Player</h1>
        <Player url={playUrl} />
      </div>
    </div>
  );
};

export default App;
