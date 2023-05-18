import { useEffect, useContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import {UserContext} from './context/UserContext';
import { useApi } from './hooks/useApi';
import { getLoggedInAdmin } from './utils/api'
import Loading from './components/loading/Loading';

// ----------------------------------------------------------------------

export default function App() {

  const {data, error, isLoading, refetch: fetchData} = useApi();

  const {updateUserContext, isAuthenticated} = useContext(UserContext);

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
      const user = data.data.user;
      updateUserContext(user);
    }else {
      console.log(data, error);
    }
  }, [data]);

  if(isLoading) {
    return <div style={{height: '100vh'}}><Loading message={"Loading User Data...."} /></div>
  }

  return (
    <HelmetProvider>
        <BrowserRouter>
          <ThemeProvider>
            <ScrollToTop />
            <StyledChart />
            <Router isAuthenticated={isAuthenticated}/>
          </ThemeProvider>
        </BrowserRouter>
    </HelmetProvider>
  );
}
