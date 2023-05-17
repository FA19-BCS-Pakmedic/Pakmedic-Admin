import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import {UserProvider} from './context/UserContext';
import { useApi } from './hooks/useApi';
import { getLoggedInAdmin } from './utils/api'

// ----------------------------------------------------------------------

export default function App() {

  const {data, error, isLoading, refetch: fetchData} = useApi();

  const fetch = () => {
    fetchData(
      getLoggedInAdmin
    );
  }

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    if(data && data.status === 'success'){
      console.log(data);
    }else {
      console.log(data, error);
    }
  }, [data]);

  return (
    <HelmetProvider>
        <BrowserRouter>
          <ThemeProvider>
            <ScrollToTop />
            <StyledChart />
            <Router />
          </ThemeProvider>
        </BrowserRouter>
    </HelmetProvider>
  );
}
