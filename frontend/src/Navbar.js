import {useEffect, useState} from 'react';
import './App.css';
import {fetchApi} from './api.js';

function Navbar(props) {
  const [items, setItems] = useState([]);

  /**
   * Returns the item from the hierarchy with the given url
   * @param {Array} items
   * @param {String} url
   * @return {Object} obj
  */
  const getItemFromItems = (items, url) => {
    let obj = [...items];
    let dirs = url.split('/');
    for ( // Skip the first part of the URL as it is not a directory
      let i = 1; i < dirs.length; i++) {
        /* This workaround is needed because the root of the state object has a different structure to 
          the objects under it. To fix this properly, change the state object so the root also has children. */
        if (i === 1) {
          obj = obj.find(item => item.url.split('/')[i] === dirs[i]);
        } else {
          obj = obj.children.find(item => item.url.split('/')[i] === dirs[i]);
        }
    }
    return obj;
  }

  /**
   * Inserts the items returned by the API into the correct position in the state.
   * @param {Array} items The items returned by the API.
   * @param {String} url The url of the directory to populate.
  */
  const populateTree = (items, url) => {
    const result = items.map((item) => {
      return (item.type === 'directory') ? 
        {
          ...item,
          expand: false,
          children: []
        } : 
        item;
    });
    setItems(oldItems => {
      if (url) {
        // Find the item with the url and populate its children
        let newItems = [...oldItems];
        let obj = getItemFromItems(newItems, url);
        obj.children = result;
        return newItems;
      } else {
        // Populate the root
        return result;
      }
    });
  }

  /**
   * Expands or collapses a directory and gets its children if necessary.
   * @param {String} url The url of the directory to expand or collapse. 
   * This is the id of the checkbox.
  */
  const handleCbCheckedChange = (url) => {
    setItems(oldItems => {
      const checked = document.getElementById(url).checked;
      let result = [...oldItems];
      let obj = getItemFromItems(result, url);
      obj.expand = checked;
      if (checked && obj.children.length === 0) {
        fetchApi(url, populateTree);
      }
      return result;
    })
  }

  useEffect(() => {
    fetchApi("", populateTree);
  }, []);

  return (
    <div id="Nav">
      {items.map(item => (
        <Node key={item.url} item={item} onChange={handleCbCheckedChange} onRadioButtonChange={props.onRadioButtonChange} />
      ))}
    </div>
  )
}




function Node(props) {
  const {name, type, url, expand, children} = props.item;
  return (
    <div className='navItem'>
      {type === 'directory' ? (
        <>
          <input type='checkbox' checked={expand} id={url} onChange={() => props.onChange(url)} />
          <label className='dirLabel'>{name}</label>
          {expand && children.map(child => (
            <Node key={child.url} item={child} onChange={props.onChange} onRadioButtonChange={props.onRadioButtonChange} />
          ))}
        </>
      ) : (
        <>
          <input type='radio' name='file' id={url} value={url} onChange={props.onRadioButtonChange} />
          <label className='fileLabel' htmlFor={url}>{name}</label>
        </>
      )}
    </div>
  )
}

export default Navbar;
