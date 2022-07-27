import './App.css';
import Navbar from './Navbar.js';
import Player from './Player.js';

function App() {
  return (
    <div>
      <Navbar />
      <div id="main">
        <h1>Pi Player</h1>
        <Player />
      </div>
    </div>
  );
}

export default App;
