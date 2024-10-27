import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Header from './components/Header/Header.tsx'
import { BrowserRouter } from 'react-router-dom'

import { QueryClient, QueryClientProvider } from 'react-query';
// Create a QueryClient instance
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header />
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
