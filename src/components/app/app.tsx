import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute } from '../../const';
import MainScreen from '../main-screen/main-screen';
import Login from '../login/login';
import PrivateRoute from '../private-route/private-route';
import Favorites from '../favorites/favorites';
import NotFound404 from '../not-found-404/not-found-404';
import Offer from '../offer/offer';

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
        <Route path={AppRoute.Login} element={<Login />} />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute>
              <Favorites />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Offer} element={<Offer />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </BrowserRouter>
  </HelmetProvider>
);

export default App;
