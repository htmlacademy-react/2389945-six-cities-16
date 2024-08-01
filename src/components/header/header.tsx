import { Link } from 'react-router-dom';
import LoggedOn from '../logged-on/logged-on';
import { Outlet, useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';
import { HeaderProps } from '../../lib/types';

function Header({ authorizationStatus }: HeaderProps): JSX.Element {
  const { pathname } = useLocation();
  const isLoggedOn = pathname === AppRoute.Login;
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
              <LoggedOn authorizationStatus={authorizationStatus} />
            )}
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
}

export default Header;
