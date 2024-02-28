import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { worker } from '../tests/mocks/browser';
import App from './App';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

if (
  process.env.NODE_ENV === 'development' &&
  import.meta.env.VITE_MSW_IN_BROWSER === 'true'
) {
  void worker.start();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools
        initialIsOpen={false}
        position="top-right"
      />
    </QueryClientProvider>
  </React.StrictMode>,
);
