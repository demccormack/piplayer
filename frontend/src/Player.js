import './App.css';

const MEDIA_ROOT = "http://127.0.0.1:8080/"

function Player(props) {
  return (
    <div id="Player">
      <video id="video" controls="controls" src={`${MEDIA_ROOT}${props.url}`} autoPlay />
    </div>
  );
}

export default Player;
