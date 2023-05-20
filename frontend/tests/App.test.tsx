import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import App from '../src/App';
import Films from './mocks/Films';
import OfficeSpace from './mocks/OfficeSpace';
import top from './mocks/top';
import { randomItemNameFrom, render } from './utils';
import { queryFn as mockQueryFn } from './mocks';

const user = userEvent.setup();

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

it('renders tree items', () => {
  render(<App />);
  expect(
    screen.getByRole('treeitem', { name: randomItemNameFrom(top) }),
  ).toBeInTheDocument();
});

it('fetches and renders child tree items on click', async () => {
  render(<App />);
  expect(screen.getByRole('treeitem', { name: 'Films' })).toBeInTheDocument();
  await user.click(screen.getByRole('treeitem', { name: 'Films' }));
  expect(
    screen.getByRole('treeitem', { name: randomItemNameFrom(Films) }),
  ).toBeInTheDocument();
});

it('fetches and renders child tree items two levels deep', async () => {
  render(<App />);
  expect(screen.getByRole('treeitem', { name: 'Films' })).toBeInTheDocument();
  await user.click(screen.getByRole('treeitem', { name: 'Films' }));
  expect(
    screen.getByRole('treeitem', { name: randomItemNameFrom(Films) }),
  ).toBeInTheDocument();
  await user.click(screen.getByRole('treeitem', { name: 'OfficeSpace' }));
  expect(
    screen.getByRole('treeitem', {
      name: randomItemNameFrom(OfficeSpace),
    }),
  ).toBeInTheDocument();
});

it("doesn't lose our place in the tree if we collapse and reopen it", async () => {
  render(<App />);
  expect(screen.getByRole('treeitem', { name: 'Films' })).toBeInTheDocument();

  // Open the tree two levels
  await user.click(screen.getByRole('treeitem', { name: 'Films' }));
  expect(
    screen.getByRole('treeitem', { name: randomItemNameFrom(Films) }),
  ).toBeVisible();
  await user.click(screen.getByRole('treeitem', { name: 'OfficeSpace' }));
  expect(
    screen.getByRole('treeitem', { name: randomItemNameFrom(OfficeSpace) }),
  ).toBeVisible();

  // Close the tree at the highest level
  await user.click(screen.getByRole('treeitem', { name: 'Films' }));
  expect(
    screen.getByRole('treeitem', {
      name: randomItemNameFrom(OfficeSpace),
      hidden: true,
    }),
  ).not.toBeVisible();

  // Open the tree again
  await user.click(screen.getByRole('treeitem', { name: 'Films' }));

  expect(
    screen.getByRole('treeitem', { name: randomItemNameFrom(OfficeSpace) }),
  ).toBeVisible();
});

it("doesn't try to fetch data it already has", async () => {
  const queryFn = vi.fn(mockQueryFn);
  // Initial fetch of top-level data
  render(<App />, { queryFn });

  // Data for Films fetched here
  await user.click(screen.getByRole('treeitem', { name: 'Films' }));
  expect(
    screen.getByRole('treeitem', {
      name: randomItemNameFrom(Films),
      hidden: true,
    }),
  ).toBeVisible();

  // Films toggled, contents are now hidden
  await user.click(screen.getByRole('treeitem', { name: 'Films' }));
  expect(
    screen.getByRole('treeitem', {
      name: randomItemNameFrom(Films),
      hidden: true,
    }),
  ).not.toBeVisible();

  // No need to fetch again
  await user.click(screen.getByRole('treeitem', { name: 'Films' }));
  expect(
    screen.getByRole('treeitem', {
      name: randomItemNameFrom(Films),
      hidden: true,
    }),
  ).toBeVisible();

  expect(queryFn).toHaveBeenCalledTimes(2);
});
