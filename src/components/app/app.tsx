import { Routes, Route } from 'react-router-dom';
import { Header } from '../header/header';
import { MainScreen } from '../main-screen/main-screen';
import { Login } from '../login/login';
import { Offer } from '../offer/offer';
import { NotFound404 } from '../not-found-404/not-found-404';
import { PrivateRoute } from '../private-route/private-route';
import { Favorites } from '../favorites/favorites';
import { AppRoute, AuthorizationStatus } from '../../const';
import { Spinner } from '../spinner/spinner';
import { useAppSelector } from '../../hooks';
import { StatusCodes } from 'http-status-codes';
import { HistoryRouter } from '../history-router/history-router';

//import { OFFERS } from '../../mocks/offers';
//import { OFFER_INFO } from '../../mocks/offer-info';
//import { useAppDispatch } from '../../hooks';
//import { setOffers } from '../../store/action';
import { createBrowserHistory } from 'history';
const browserHistory = createBrowserHistory();

export const App = (): JSX.Element => {
  const isOffersLoading = useAppSelector((state) => state.isOffersLoading);
  const responseStatus = useAppSelector((state) => state.responseStatus);
  const authorizationStatus = useAppSelector(
    (state) => state.authorizationStatus
  );

  if (responseStatus === StatusCodes.NOT_FOUND) {
    return <NotFound404 />;
  }

  if (isOffersLoading || authorizationStatus === AuthorizationStatus.Unknown) {
    return <Spinner />;
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<Header />}
        >
          <Route index element={<MainScreen />} />
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
        <Route path={AppRoute.Login} element={<Login />} />
      </Routes>
    </HistoryRouter>
  );
};
