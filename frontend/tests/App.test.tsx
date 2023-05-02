import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from '../src/App';
import { render, screen, waitFor } from '@testing-library/react';

const queryClient = new QueryClient();
const renderWithProviders = (element: JSX.Element) =>
  render(
    <QueryClientProvider client={queryClient}>{element}</QueryClientProvider>,
  );

it('renders the app', () => {
  const { container } = renderWithProviders(<App />);
  expect(container).toBeInTheDocument();
});

it('renders the main panel', () => {
  renderWithProviders(<App />);
  expect(screen.getByRole('main')).toBeInTheDocument();
});

it('renders the title', () => {
  renderWithProviders(<App />);
  expect(
    screen.getByRole('heading', { name: 'Pi Player' }),
  ).toBeInTheDocument();
});

it('renders the video player', () => {
  renderWithProviders(<App />);
  expect(screen.getByText('Video should play here').nodeName).toBe('VIDEO');
});

it('renders the sidebar', () => {
  renderWithProviders(<App />);
  expect(screen.getByRole('navigation')).toBeInTheDocument();
});

it('renders the menu tree', () => {
  renderWithProviders(<App />);
  expect(screen.getByRole('tree').nodeName).toBe('MENU');
});

it('receives the API and media URLs from environment variables', () => {
  expect(import.meta.env.VITE_API_ROOT).toBeTruthy();
  expect(import.meta.env.VITE_MEDIA_ROOT).toBeTruthy();
});

it('loads media from source specified in environment variables', () => {
  renderWithProviders(<App />);
  const MEDIA_ROOT: string = import.meta.env.VITE_MEDIA_ROOT;
  expect(MEDIA_ROOT).toBeTruthy();
  expect(
    screen.getByText('Video should play here').getAttribute('src'),
  ).toMatch(new RegExp(`^${MEDIA_ROOT}`));
});

it('renders content fetched from API', async () => {
  renderWithProviders(<App />);
  await waitFor(() =>
    expect(screen.queryByText(/welcome/i)).toBeInTheDocument(),
  );
});
