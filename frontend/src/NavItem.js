import { useEffect, useState, createRef, forwardRef, useRef, useImperativeHandle } from 'react';
import './App.css';
import {fetchApi} from './api.js';

const Dir = forwardRef(function Directory(props, ref) {
  // Start the Directory collapsed by default.
  const [expand, setExpand] = useState(false);
  const [items, setItems] = useState([]);
  
  const childRef = useRef();
  childRef.current = [];
  const addToRefs = (el) => {
    if (el && !childRef.current.includes(el)) {
      childRef.current.push(el);
    }
  };

  useImperativeHandle(
      ref,
      () => ({
        handleCbCheckedChange(url) {
          console.log(document.getElementById(url).checked + " " + url);
          if (document.getElementById(url).checked) {
            fetchApi(url, setItems);
            setExpand(true);
          } else {
            setExpand(false);
          }
        }
       }),
   );

  useEffect(() => {
    if (props.initExpand) {
      fetchApi(props.url, setItems);
      setExpand(true);
    }
  }, []);

  return (
    <div className="navItem">
      {items.map((item, i) => (
        <div key={item.url}>
          {(item.type === "directory") ? <>
              <input type='checkbox' onChange={() => childRef.current[i].handleCbCheckedChange(item.url)} id={item.url} value={item.url}></input>
              <label className='dirLabel' htmlFor={item.url}>{item.name}</label>
              <Dir url={item.url} ref={addToRefs} />
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
);

export default Dir;
