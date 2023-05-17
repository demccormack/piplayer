import top from './top';
import Films from './Films';
import OfficeSpace from './OfficeSpace';
import { MediaItem } from '../../src/App';

const queryFn: (
  API_ROOT: string,
  {
    params: { dir },
  }: { params: { dir: string } },
) => Promise<{ data: MediaItem[] | string }> = async (
  _API_ROOT,
  { params: { dir } },
) =>
  await Promise.resolve({
    data:
      dir === ''
        ? top
        : dir === 'Films'
        ? Films
        : dir === 'Films/OfficeSpace'
        ? OfficeSpace
        : '<!doctype html>\n<html lang=en>\n<title>500 Internal Server Error</title>\n<h1>Internal Server Error</h1>\n<p>The server encountered an internal error and was unable to complete your request. Either the server is overloaded or there is an error in the application.</p>\n',
  });

export { queryFn };
