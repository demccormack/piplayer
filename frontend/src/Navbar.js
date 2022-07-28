import {useEffect, useState} from 'react';
import './App.css';
import {fetchApi} from './api.js';

function Navbar(props) {
  const [items, setItems] = useState([]);

  const populateTree = (items) => {
    const result = items.map((item) => {
      return (item.type === 'directory') ? 
        {
          ...item,
          expand: false,
          children: []
        } : 
        item;
    });
    setItems(oldItems => result);
  }

  const handleCbCheckedChange = (url) => {
    setItems(oldItems => {
      const result = oldItems.map((item) => {
        if (item.url === url) {
          item.expand = document.getElementById(url).checked;
        }
        return item;
      });
      return result;
    })
  }

  useEffect(() => {
    fetchApi("", populateTree);
  }, []);

  return (
    <div id="Nav">
      {items.map(item => (
        <Dir key={item.url} item={item} onChange={handleCbCheckedChange} />
      ))}
    </div>
  )
}




function Dir(props) {
  return (
    <div className='navItem'>
      <input type='checkbox'  id={props.item.url} onChange={() => props.onChange(props.item.url)} />
      <label className='dirLabel'>{props.item.name + props.item.expand}</label>
      {props.item.expand && props.item.children.map(child => (
        <Dir key={child.url} item={child} onChange={props.onChange} />
      ))}
    </div>
  )
}

export default Navbar;
