import {
  unstable_HistoryRouter as HistoryRouter,
  Routes,
  Route,
} from 'react-router-dom';

import { Header } from '../header/header';
import { MainScreen } from '../main-screen/main-screen';
import { Login } from '../login/login';
import { Offer } from '../offer/offer';
import { NotFound404 } from '../not-found-404/not-found-404';
import { PrivateRoute } from '../private-route/private-route';
import { Favorites } from '../favorites/favorites';
import { AppRoute, AuthorizationStatus } from '../../const';

import { history } from '../../history';

//import { OFFERS } from '../../mocks/offers';
//import { OFFER_INFO } from '../../mocks/offer-info';
//import { useAppDispatch } from '../../hooks';
//import { setOffers } from '../../store/action';
//import type { BrowserHistory } from 'history';

export const App = (): JSX.Element => (
  <HistoryRouter history={history}>
    <Routes>
      <Route
        path={AppRoute.Root}
        element={<Header authorizationStatus={AuthorizationStatus.Auth} />}
      >
        <Route index element={<MainScreen />} />
        <Route path={AppRoute.Login} element={<Login />} />
        <Route path={`${AppRoute.Offer}/:id`} element={<Offer />} />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute>
              <Favorites />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound404 />} />
      </Route>
    </Routes>
  </HistoryRouter>
);
