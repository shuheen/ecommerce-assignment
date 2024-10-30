import {StrictMode, Suspense} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App';
import Header from './components/Header/Header';
import {BrowserRouter, useLocation} from 'react-router-dom';

import {QueryClient, QueryClientProvider} from 'react-query';
import {RecoilRoot} from 'recoil';
import LoaderMutationDots from './components/Loader/LoaderMutationDots';
import {ToastProvider} from './Providers/ToasterProvider'; // Adjust the import path as necessary
import {NO_HEADER_PAGES} from './constants/global';

const queryClient = new QueryClient();

const Root = () => {
  const location = useLocation();

  return (
    <Suspense fallback={<LoaderMutationDots />}>
      {!NO_HEADER_PAGES.includes(location.pathname) && <Header />}
      <App />
    </Suspense>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ToastProvider>
          <BrowserRouter>
            <Root />
          </BrowserRouter>
        </ToastProvider>
      </RecoilRoot>
    </QueryClientProvider>
  </StrictMode>
);
