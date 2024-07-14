import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute } from '../../const';
import MainScreen from '../../pages/main-screen/main-screen';

type AppProps = {
  offersCount: number;
};

const App = ({ offersCount }: AppProps): JSX.Element => (
  <HelmetProvider>
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<MainScreen offersCount={offersCount} />}
        />
      </Routes>
    </BrowserRouter>
  </HelmetProvider>
);

export default App;
