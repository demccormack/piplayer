import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MediaItem } from '../../src/App';
import { ReactElement } from 'react';
import { RenderOptions, render } from '@testing-library/react';

const randomItemNameFrom = (array: MediaItem[]) =>
  array[Math.floor(Math.random() * array.length)].name;

const wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      {children}
    </QueryClientProvider>
  );
};

const customRender = (
  ui: ReactElement,
  { ...options }: Omit<RenderOptions, 'wrapper'> = {},
) => {
  expect(document.body).toBeEmptyDOMElement();
  return render(ui, { wrapper, ...options });
};

export { customRender as render, randomItemNameFrom };
