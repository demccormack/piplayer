import './App.css';
import Dir from './NavItem.js';
import Player from './Player.js';

function App() {
  return (
    <div>
      <div id="Nav">
        <Dir url="" initExpand={true} />
      </div>
      <div id="main">
        <h1>Pi Player</h1>
        <Player />
      </div>
    </div>
  );
}

export default App;
