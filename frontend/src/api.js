const API_ROOT = process.env.REACT_APP_API_ROOT;

/**
 * Fetches a directory listing from the API and calls the callback function with the result.
 * @param {String} dir The path of the directory to fetch.
 * @param {Function} callback The callback function to call with the result.
*/
const fetchApi = (dir, callback) => fetch(`${API_ROOT}?dir=${dir}`)
  .then((response) => response.json())
  .then((items) => callback(items, dir));

export default fetchApi;
