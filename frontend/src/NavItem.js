import { useEffect, useState } from 'react';
import './App.css';
import {fetchApi} from './api.js';

function NavItem(props) {
  // Start the NavItem collapsed by default.
  const [expand, setExpand] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (props.initExpand) {
      fetchApi(props.url, setItems);
      setExpand(true);
    }
  }, []);

  function handleCbCheckedChange(url) {
    console.log(document.getElementById(url).checked + " " + url);
    if (document.getElementById(url).checked) {
      fetchApi(url, setItems);
    } else {
      setExpand(false);
    }
  }

  return (
    <div className="navItem">
      {items.map(item => (
        <div key={item.url}>
          {(item.type === "directory") ? <>
              <input type='checkbox' onChange={() => handleCbCheckedChange(item.url)} id={item.url} value={item.url}></input>
              <label className='dirLabel' htmlFor={item.url}>{item.name}</label>
              <NavItem url={item.url} />
            </> : <>
              <input type='radio' id={item.url} value={item.url}></input>
              <label className='fileLabel' name='file' htmlFor={item.url}>{item.name}</label>
            </>
          }
        </div>
      ))}
    </div>
  );
}

export default NavItem;
