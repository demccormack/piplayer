import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App, { queryFn, QueryContext } from './App';
import './index.css';
import { worker } from '../tests/mocks/browser';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

if (process.env.NODE_ENV === 'development') {
  void worker.start();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <QueryContext.Provider value={{ queryFn }}>
        <App />
      </QueryContext.Provider>
      <ReactQueryDevtools
        initialIsOpen={false}
        position="bottom-right"
      />
    </QueryClientProvider>
  </React.StrictMode>,
);
