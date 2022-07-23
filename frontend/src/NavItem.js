import { useEffect, useState } from 'react';
import './App.css';

const API_ROOT = "http://127.0.0.1:8080/?dir=";

function NavItem(props) {
  // Start the NavItem collapsed by default.
  const [state, setState] = useState({
    "expand": false, 
    "items": []
  });

  useEffect(() => {
    if (props.initExpand) {
      fetchApi(props.url)
    }
  }, []);

  function handleCbCheckedChange(url) {
    console.log(document.getElementById(url).checked + " " + url);
    if (document.getElementById(url).checked) {
      fetchApi(url.slice(6));
    } else {
      setState((prevState) => ({ ...prevState, "expand": false }));
    }
  }

  function fetchApi(url) {
    fetch(`${API_ROOT}${url}`)
    .then(response => response.json())
    .then(data => {
      // Update the state with the list of items.
      setState({
        "expand": true, 
        "items": data
      });
    });
  }

  const mapItem = (item) => {
    if (item.type === "directory") {
      return (
        <div key={item.url}>
          <input type='checkbox' onChange={() => handleCbCheckedChange(item.url)} id={item.url} value={item.url}></input>
          <label className='dirLabel' htmlFor={item.url}>{item.name}</label>
          <NavItem url={item.url} />
        </div>
      )
    } else {
      return (
        <div key={item.url}>
          <input type='radio' id={item.url} value={item.url}></input>
          <label className='fileLabel' name='file' htmlFor={item.url}>{item.name}</label>
        </div>
      );
    };
  }

  return (
    <div className="navItem">
      {state.items.map(item => (
        mapItem(item)
      ))}
    </div>
  );
}

export default NavItem;
