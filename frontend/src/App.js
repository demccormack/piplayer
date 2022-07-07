import './App.css';
import NavItem from './NavItem.js';
import Player from './Player.js';

function App() {
  return (
    <div>
      <div id="Nav">
        <NavItem url="" />
      </div>
      <div id="main">
        <h1>Pi Player</h1>
        <Player />
      </div>
    </div>
  );
}

export default App;
