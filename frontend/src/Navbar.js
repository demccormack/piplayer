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
    console.log("Checked: " + url);
    setItems(oldItems => {
      const result = oldItems.map((item) => {
        if (item.url === url) {
          item.expand = !item.expand;
          console.log("Expand: " + item.expand);
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
      <input type='checkbox' onChange={() => props.onChange(props.item.url)} />
      <label className='dirLabel'>{props.item.name + props.item.expand}</label>
    </div>
  )
}

export default Navbar;
