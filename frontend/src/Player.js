import './App.css';

function Player(props) {
  return (
    <div id="Player">
      <video id="video" controls="controls" src={props.url} autoPlay />
    </div>
  );
}

export default Player;
