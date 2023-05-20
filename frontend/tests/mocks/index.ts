import top from './top';
import Films from './Films';
import OfficeSpace from './OfficeSpace';
import { MediaItem } from '../../src/App';
import { AxiosError } from 'axios';

const queryFn: (
  url: string,
  {
    params: { dir },
  }: { params: { dir: string } },
) => Promise<{ data: MediaItem[] | AxiosError }> = async (
  _API_ROOT,
  { params: { dir } },
) => {
  const data =
    dir === ''
      ? top
      : dir === 'Films'
      ? Films
      : dir === 'Films/OfficeSpace'
      ? OfficeSpace
      : undefined;

  return data
    ? await Promise.resolve({ data })
    : await Promise.reject({
        message: 'Request failed with status code 500',
        name: 'AxiosError',
        stack:
          'AxiosError: Request failed with status code 500\n    at settle (http://localhost:3000/node_modules/.vite/deps/axios.js?v=429e27c8:1185:12)\n    at XMLHttpRequest.onloadend (http://localhost:3000/node_modules/.vite/deps/axios.js?v=429e27c8:1409:7)',
        config: {
          transitional: {
            silentJSONParsing: true,
            forcedJSONParsing: true,
            clarifyTimeoutError: false,
          },
          adapter: ['xhr', 'http'],
          transformRequest: [null],
          transformResponse: [null],
          timeout: 0,
          xsrfCookieName: 'XSRF-TOKEN',
          xsrfHeaderName: 'X-XSRF-TOKEN',
          maxContentLength: -1,
          maxBodyLength: -1,
          env: {},
          headers: {
            Accept: 'application/json, text/plain, */*',
          },
          params: {
            dir,
          },
          method: 'get',
          url: 'http://127.0.0.1:8080/',
        },
        code: 'ERR_BAD_RESPONSE',
        status: 500,
        response: {
          data: '<!doctype html>\n<html lang=en>\n<title>500 Internal Server Error</title>\n<h1>Internal Server Error</h1>\n<p>The server encountered an internal error and was unable to complete your request. Either the server is overloaded or there is an error in the application.</p>\n',
          status: 500,
          statusText: 'INTERNAL SERVER ERROR',
          headers: {
            'content-length': '265',
            'content-type': 'text/html; charset=utf-8',
          },
          config: {
            transitional: {
              silentJSONParsing: true,
              forcedJSONParsing: true,
              clarifyTimeoutError: false,
            },
            adapter: ['xhr', 'http'],
            transformRequest: [null],
            transformResponse: [null],
            timeout: 0,
            xsrfCookieName: 'XSRF-TOKEN',
            xsrfHeaderName: 'X-XSRF-TOKEN',
            maxContentLength: -1,
            maxBodyLength: -1,
            env: {},
            headers: {
              Accept: 'application/json, text/plain, */*',
            },
            params: {
              dir,
            },
            method: 'get',
            url: 'http://127.0.0.1:8080/',
          },
        },
      });
};

export { queryFn };
