import './App.css';
import { useState } from "react";

function Player() {
  const [url, setUrl] = useState("https://professionalsoaring.com/tools/webcam/cam1.jpg");
  return (
    <div id="Player">
      <img id="video" src={url} alt=""></img>
    </div>
  );
}

export default Player;
