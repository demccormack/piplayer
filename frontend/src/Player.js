import './App.css';

const MEDIA_ROOT = process.env.REACT_APP_MEDIA_ROOT;

function Player({ url }) {
  return (
    <div id='Player'>
      <video
        id='video'
        controls='controls'
        src={`${MEDIA_ROOT}${url}`}
        autoPlay
      >
        video
      </video>
    </div>
  );
}

export default Player;
