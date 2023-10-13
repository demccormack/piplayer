import { setupServer } from 'msw/node';
import { rest } from 'msw';
import top from './top';
import Films from './Films';
import OfficeSpace from './OfficeSpace';

const handlers = [
  rest.get(import.meta.env.VITE_API_ROOT, (req, res, ctx) => {
    const dir = req.url.searchParams.get('dir');

    const data =
      dir === ''
        ? top
        : dir === 'Films'
        ? Films
        : dir === 'Films/OfficeSpace'
        ? OfficeSpace
        : undefined;

    return data
      ? res(ctx.status(200), ctx.json(data))
      : res(
          ctx.status(500),
          ctx.set('Content-Type', 'text/html; charset=utf-8'),
          ctx.body(`
<!doctype html>
<html lang=en>
<title>500 Internal Server Error</title>
<h1>Internal Server Error</h1>
<p>The server encountered an internal error and was unable to complete your request. Either the server is overloaded or there is an error in the application.</p>
          `),
        );
  }),
  rest.get(`${import.meta.env.VITE_MEDIA_ROOT}welcome`, (req, res, ctx) => {
    return res(ctx.status(204));
  }),
];

const server = setupServer(...handlers);

export { handlers, server };
