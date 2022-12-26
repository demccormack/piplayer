const API_ROOT = "http://127.0.0.1:8002/?dir=";

/**
 * Fetches a directory listing from the API and calls the callback function with the result.
 * @param {String} url The url of the directory to fetch.
 * @param {Function} callback The callback function to call with the result.
*/
const fetchApi = (url, callback) => fetch(`${API_ROOT}${url}`)
  .then((response) => response.json())
  .then((items) => callback(items, url));

export default fetchApi;
