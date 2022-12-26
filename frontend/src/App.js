import './App.css';
import Navbar from './Navbar.js';
import Player from './Player.js';
import { useState } from "react";

const MEDIA_ROOT = "http://127.0.0.1:8080/"

function App() {
  const [playUrl, setPlayUrl] = useState("https://professionalsoaring.com/tools/webcam/cam1.jpg");

  const handleRadioButtonChange = () => {
    let url = document.querySelector('input[name="file"]:checked').value;
    setPlayUrl(`${MEDIA_ROOT}${url}`);
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
