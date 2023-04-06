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
