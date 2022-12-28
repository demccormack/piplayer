import './App.css';

const MEDIA_ROOT = process.env.REACT_APP_MEDIA_ROOT;

function Player(props) {
  return (
    <div id="Player">
      <video id="video" controls="controls" src={`${MEDIA_ROOT}${props.url}`} autoPlay />
    </div>
  );
}

export default Player;
