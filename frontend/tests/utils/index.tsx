import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MediaItem, QueryContext, queryFnType } from '../../src/App';
import { ReactElement } from 'react';
import { RenderOptions, render } from '@testing-library/react';
import { queryFn as mockQueryFn } from '../mocks';

const randomItemNameFrom = (array: MediaItem[]) =>
  array[Math.floor(Math.random() * array.length)].name;

const queryClient = new QueryClient();

const wrapperWith =
  (queryFn: queryFnType) =>
  ({ children }: { children: React.ReactNode }) => {
    return (
      <QueryContext.Provider value={{ queryFn }}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </QueryContext.Provider>
    );
  };

const customRender = (
  ui: ReactElement,
  {
    queryFn,
    ...options
  }: Omit<RenderOptions, 'wrapper'> & { queryFn: queryFnType } = {
    queryFn: mockQueryFn,
  },
) => {
  const wrapper = wrapperWith(queryFn);
  return render(ui, { wrapper, ...options });
};

export { customRender as render, randomItemNameFrom };
