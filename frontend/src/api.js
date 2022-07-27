const API_ROOT = "http://127.0.0.1:8080/?dir=";

export function fetchApi(url, callback) {
    fetch(`${API_ROOT}${url.slice(6)}`)
    .then(response => response.json())
    .then(items => {
      // Update the state with the list of items.
      callback(items);
    });
  }