import App from '../src/App';
import { render, screen } from '@testing-library/react';

it('renders the app', () => {
  const { container } = render(<App />);
  expect(container).toBeInTheDocument();
});

it('renders the main panel', () => {
  render(<App />);
  expect(screen.getByRole('main')).toBeInTheDocument();
});

it('renders the title', () => {
  render(<App />);
  expect(
    screen.getByRole('heading', { name: 'Pi Player' }),
  ).toBeInTheDocument();
});

it('renders the video player', () => {
  render(<App />);
  expect(screen.getByText('Video should play here').nodeName).toBe('VIDEO');
});

it('renders the sidebar', () => {
  render(<App />);
  expect(screen.getByRole('navigation')).toBeInTheDocument();
});

it('renders the menu tree', () => {
  render(<App />);
  expect(screen.getByRole('tree').nodeName).toBe('MENU');
});

it('receives the API and media URLs from environment variables', () => {
  expect(import.meta.env.VITE_API_ROOT).toBeTruthy();
  expect(import.meta.env.VITE_MEDIA_ROOT).toBeTruthy();
});

it('loads media from source specified in environment variables', () => {
  render(<App />);
  const MEDIA_ROOT: string = import.meta.env.VITE_MEDIA_ROOT;
  expect(MEDIA_ROOT).toBeTruthy();
  expect(
    screen.getByText('Video should play here').getAttribute('src'),
  ).toMatch(new RegExp(`^${MEDIA_ROOT}`));
});
