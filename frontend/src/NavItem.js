import { useEffect, useState } from 'react';
import './App.css';

function NavItem() {
  // Start the NavItem collapsed by default.
  const [state, setState] = useState({
    "expand": false, 
    "items": []
  });

  useEffect(() => {
    // Get the list of items from the server.
    fetch("http://127.0.0.1:8080/?dir=")
      .then(response => response.json())
      .then(data => {
        // Update the state with the list of items.
        setState({"expand": true, "items": data});
      });
  }, []);

  return (
    <div className="navItem">
      {state.items.map(item => (
        <p>{item.name}</p>
      ))}
    </div>
  );
}

export default NavItem;
