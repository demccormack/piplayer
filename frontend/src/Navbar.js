import { useCallback, useEffect, useState } from 'react';
import fetchApi from './api';
import './App.css';

const Navbar = ({ onRadioButtonChange }) => {
  const [items, setItems] = useState([]);

  /**
   * Returns the item from the hierarchy with the given url
   * @param {Array} items
   * @param {String} url
   * @return {Object} obj
   */
  const getItemFromItems = (items, url) => {
    let obj = [...items];
    const dirs = url.split('/');
    for (let i = 0; i < dirs.length; i++) {
      /* This workaround is needed because the root of the state object has a different structure to 
          the objects under it. To fix this properly, change the state object so the root also has children. */
      if (i === 0) {
        obj = obj.find((item) => item.url.split('/')[i] === dirs[i]);
      } else {
        obj = obj.children.find((item) => item.url.split('/')[i] === dirs[i]);
      }
    }
    return obj;
  };

  /**
   * Inserts the items returned by the API into the correct position in the state.
   * @param {Array} items The items returned by the API.
   * @param {String} url The url of the directory to populate.
   */
  const populateTree = useCallback(
    (items, url) => {
      const result = items.map((item) =>
        item.type === 'directory'
          ? {
              ...item,
              expand: false,
              children: [],
            }
          : item,
      );
      setItems((oldItems) => {
        if (url) {
          // Find the item with the url and populate its children
          const newItems = [...oldItems];
          const obj = getItemFromItems(newItems, url);
          obj.children = result;
          return newItems;
        } else {
          // Populate the root
          return result;
        }
      });
    },
    [setItems],
  );

  /**
   * Expands or collapses a directory and gets its children if necessary.
   * @param {String} url The url of the directory to expand or collapse.
   * This is the id of the checkbox.
   */
  const handleCbCheckedChange = (url) =>
    setItems((oldItems) => {
      const checked = document.getElementById(url).checked;
      const result = [...oldItems];
      const obj = getItemFromItems(result, url);
      obj.expand = checked;
      if (checked && obj.children.length === 0) {
        fetchApi(url, populateTree);
      }
      return result;
    });

  useEffect(() => {
    fetchApi('', populateTree);
  }, [populateTree]);

  return (
    <div id='Nav'>
      {items.map((item) => (
        <Node
          key={item.url}
          item={item}
          onChange={handleCbCheckedChange}
          onRadioButtonChange={onRadioButtonChange}
        />
      ))}
    </div>
  );
};

const Node = ({
  item: { name, type, url, expand, children },
  onChange,
  onRadioButtonChange,
}) => (
  <div className='navItem'>
    {type === 'directory' ? (
      <>
        <input
          type='checkbox'
          checked={expand}
          id={url}
          onChange={() => onChange(url)}
        />
        <label className='dirLabel'>{name}</label>
        {expand &&
          children.map((child) => (
            <Node
              key={child.url}
              item={child}
              onChange={onChange}
              onRadioButtonChange={onRadioButtonChange}
            />
          ))}
      </>
    ) : (
      <>
        <input
          type='radio'
          name='file'
          id={url}
          value={url}
          onChange={onRadioButtonChange}
        />
        <label
          className='fileLabel'
          htmlFor={url}
        >
          {name}
        </label>
      </>
    )}
  </div>
);

export default Navbar;
