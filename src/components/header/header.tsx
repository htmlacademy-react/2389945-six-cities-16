import { Link } from 'react-router-dom';
import { LoggedOn } from '../logged-on/logged-on';
import { Outlet, useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';
//import { HeaderProps } from '../../lib/types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { AuthorizationStatus } from '../../const';
import { fetchFavorite } from '../../store/api-actions';


export const Header = (): JSX.Element => {

  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(
    (state) => state.authorizationStatus
  );

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavorite());
    }
  }, [dispatch, authorizationStatus]);

  const { pathname } = useLocation();
  const isLoggedOn = pathname === String(AppRoute.Login);
  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link
                className="header__logo-link header__logo-link--active"
                to={AppRoute.Root}
              >
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </Link>
            </div>
            {!isLoggedOn && (
              <LoggedOn />
            )}
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
};


