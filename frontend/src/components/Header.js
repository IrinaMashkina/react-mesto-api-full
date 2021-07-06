import React from "react";
import logo from "../images/logo.svg";
import { Link, useLocation } from "react-router-dom";

function Header({ loggedIn, onSignOut, userEmail }) {
  const location = useLocation();

  const windowSize = window.innerWidth;

  const [hamburgerMenuIsOpen, setHamburgerMenuIsOpen] = React.useState(false);
  function handleToggleHamburgerMenu() {
    setHamburgerMenuIsOpen(!hamburgerMenuIsOpen);
  }

  return (
    <header className="header">
      {loggedIn && hamburgerMenuIsOpen && windowSize < 720 && (
        <div className="header__wrapper header__wrapper_mobile">
          <div className="header__hamburger-menu-wrapper">
            <address className="header__address header__address_mobile">
              {userEmail}
            </address>
            <button
              type="button"
              onClick={onSignOut}
              className="header__button"
            >
              Выйти
            </button>
          </div>
          <div className="header__low-wrapper">
            <img
              src={logo}
              alt="Логотип сервиса Место."
              className="header__logo"
            />
            <button
              type="button"
              className="header__close-button"
              onClick={handleToggleHamburgerMenu}
            ></button>
          </div>
        </div>
      )}

      {loggedIn && windowSize >= 720 && (
        <>
          <img
            src={logo}
            alt="Логотип сервиса Место."
            className="header__logo"
          />
          <div className="header__wrapper">
            <address className="header__address">
              {userEmail && userEmail}
            </address>
            <button
              type="button"
              onClick={onSignOut}
              className="header__button"
            >
              Выйти
            </button>
          </div>
        </>
      )}

      {loggedIn && !hamburgerMenuIsOpen && windowSize < 720 && (
        <>
          <img
            src={logo}
            alt="Логотип сервиса Место."
            className="header__logo"
          />
          <button
            className="hamburger-menu"
            type="button"
            onClick={handleToggleHamburgerMenu}
          >
            <div className="hamburger-menu__line"></div>
          </button>
        </>
      )}

      {!loggedIn && (
        <>
          <img
            src={logo}
            alt="Логотип сервиса Место."
            className="header__logo"
          />
          <nav>
            {location.pathname === "/sign-in" && (
              <Link className="header__navlink" to="./sign-up">
                Регистрация
              </Link>
            )}
            {location.pathname === "/sign-up" && (
              <Link className="header__navlink" to="/sign-in">
                Войти
              </Link>
            )}
          </nav>
        </>
      )}
    </header>
  );
}

export default Header;
