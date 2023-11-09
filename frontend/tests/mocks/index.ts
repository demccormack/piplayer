import { setupServer } from 'msw/node';
import { http } from 'msw';
import top from './top';
import Films from './Films';
import OfficeSpace from './OfficeSpace';

const handlers = [
  http.get(import.meta.env.VITE_API_ROOT, ({ request }) => {
    const url = new URL(request.url);
    const dir = url.searchParams.get('dir');

    const data =
      dir === ''
        ? top
        : dir === 'Films'
        ? Films
        : dir === 'Films/OfficeSpace'
        ? OfficeSpace
        : undefined;

    return data
      ? new Response(JSON.stringify(data), {
          status: 204,
        })
      : new Response(
          `
<!doctype html>
<html lang=en>
<title>500 Internal Server Error</title>
<h1>Internal Server Error</h1>
<p>The server encountered an internal error and was unable to complete your request. Either the server is overloaded or there is an error in the application.</p>
`,
          {
            status: 500,
            headers: { 'Content-Type': 'text/html; charset=utf-8' },
          },
        );
  }),
  http.get(`${import.meta.env.VITE_MEDIA_ROOT}welcome`, () => {
    return new Response(null, {
      status: 204,
    });
  }),
];

const server = setupServer(...handlers);

export { handlers, server };
