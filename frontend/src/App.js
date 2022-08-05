import './App.css';
import Navbar from './Navbar.js';
import Player from './Player.js';
import { useState } from "react";

function App() {
  const [playUrl, setPlayUrl] = useState("https://professionalsoaring.com/tools/webcam/cam1.jpg");

  const handleRadioButtonChange = () => {
    let url = document.querySelector('input[name="file"]:checked').value;
    setPlayUrl(url);
  }

  return (
    <div>
      <Navbar onRadioButtonChange={handleRadioButtonChange} />
      <div id="main">
        <h1>Pi Player</h1>
        <Player url={playUrl} />
      </div>
    </div>
  );
}

export default App;
