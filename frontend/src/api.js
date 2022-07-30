const API_ROOT = "http://127.0.0.1:8080/?dir=";

/**
 * Fetches a directory listing from the API and calls the callback function with the result.
 * @param {String} url The url of the directory to fetch.
 * @param {Function} callback The callback function to call with the result.
*/
export function fetchApi(url, callback) {
    fetch(`${API_ROOT}${url.slice(6)}`)
    .then(response => response.json())
    .then(items => {
      // Update the state with the list of items.
      callback(items, url);
    });
  }