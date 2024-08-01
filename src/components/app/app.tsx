import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../header/header';
import MainScreen from '../main-screen/main-screen';
import Login from '../login/login';
import Favorites from '../favorites/favorites';
import Offer from '../offer/offer';
import NotFound404 from '../not-found-404/not-found-404';
import PrivateRoute from '../private-route/private-route';
import { AppRoute, AuthorizationStatus } from '../../const';
import type { AppProps } from '../../lib/types';
import { OFFER_INFO } from '../../mocks/offer-info';

const App = (props: AppProps): JSX.Element => {
  const { offersCount, offers } = props;
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<Header authorizationStatus={AuthorizationStatus.Auth} />}
        >
          <Route
            index
            element={<MainScreen offersCount={offersCount} offers={offers} />}
          />
          <Route path={AppRoute.Login} element={<Login />} />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
                <Favorites offers={offers} />
              </PrivateRoute>
            }
          />
          <Route
            path={`${AppRoute.Offer}/:id`}
            element={<Offer offer={OFFER_INFO} />}
          />
        </Route>
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
