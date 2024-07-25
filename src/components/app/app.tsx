import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainScreen from '../main-screen/main-screen';
import Login from '../login/login';
import Favorites from '../favorites/favorites';
import Offer from '../offer/offer';
import NotFound404 from '../not-found-404/not-found-404';
import PrivateRoute from '../private-route/private-route';
import { AppRoute, AuthorizationStatus } from '../../const';
import { AppProps } from '../../lib/types';

const App = (props: AppProps): JSX.Element => {
  const { offersCount, offers } = props;
  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={<MainScreen offersCount={offersCount} offers={offers} />}
        />
        <Route path={AppRoute.Login} element={<Login />} />
        <Route
          path={`${AppRoute.Offer}/:id`}
          element={<Offer offer={offers[0]} />}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <Favorites offers={offers} />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
