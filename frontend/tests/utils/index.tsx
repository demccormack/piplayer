import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MediaItem, QueryContext } from '../../src/App';
import TestQueryContextValue from '../mocks/TestQueryContextValue';
import { ReactElement } from 'react';
import { RenderOptions, render } from '@testing-library/react';
import fs from 'fs';

const randomItemNameFrom = (array: MediaItem[]) =>
  array[Math.floor(Math.random() * array.length)].name;

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryContext.Provider value={TestQueryContextValue}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </QueryContext.Provider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => {
  const view = render(ui, { wrapper, ...options });

  const style = document.createElement('style');
  style.innerHTML = fs.readFileSync('tests/utils/index.css', 'utf8');
  document.head.appendChild(style);

  return view;
};

export { customRender as render, randomItemNameFrom };
