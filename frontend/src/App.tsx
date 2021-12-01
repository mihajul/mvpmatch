import { useSelector } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';

import GlobalStyles from './styles/global';
import { RootState } from './stores';
import useCurrentSession from './hooks/useCurrentSession';
import PublicRoutes from './routes/PublicRoutes';
import PrivateRoutes from './routes/PrivateRoutes';

function App() {
  const { isLoggedIn, isLoading } = useSelector((state: RootState) => state.app);

  useCurrentSession();

  if (isLoading) {
    return null;
  }

  return (
    <HelmetProvider>
      <div className="App">
        <GlobalStyles />
        {isLoggedIn && <PrivateRoutes />}
        {!isLoggedIn && <PublicRoutes />}
      </div>
    </HelmetProvider>
  );
}

export default App;
