import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import HeaderModal from "./HeaderModal";
import Logo from "../../img/jiphyeonjeon_logo.svg";
import Hamburger from "../../img/Hamburger_OwlDsgnr.png";
import SearchBook from "../../img/Search_VectorsMarket.png";
import "../../css/MobileHeader.css";

const MobileHeader = () => {
  const [headerModal, setHeaderModal] = useState(false);
  const [isFixed, setFixed] = useState(false);
  const location = useLocation();

  const openHeaderModal = () => {
    setHeaderModal(true);
  };

  const stickyHeader = () => {
    if (window.pageYOffset > 0) {
      setFixed(true);
    } else {
      setFixed(false);
    }
  };

  window.onscroll = stickyHeader;

  const closeHeader = () => {
    setHeaderModal(false);
  };

  useEffect(closeHeader, [location.pathname]);

  return (
    <header className={isFixed ? "fixed-header" : "mobile-header"}>
      <section
        className={
          isFixed
            ? `${headerModal ? "f-header-none" : "f-header"} `
            : "m-header"
        }
      >
        <div className="m-header__logo">
          <Link to={{ pathname: `/` }}>
            <img src={Logo} className="m-header__logo-icon" alt="logo" />
          </Link>
        </div>
        <nav className="m-header__gnb">
          <ul className="m-header__ul">
            <li>
              <Link className="m-header__button" to={{ pathname: `/search` }}>
                <img
                  src={SearchBook}
                  className="m-header__gnb__search-icon"
                  alt="search"
                />
              </Link>
            </li>
            <li>
              <button
                className="m-header__hamburger-button"
                type="button"
                onClick={openHeaderModal}
              >
                <img
                  src={Hamburger}
                  className="gnb__hamburger__icon"
                  alt="dropdown"
                />
              </button>
            </li>
          </ul>
        </nav>
      </section>
      {headerModal ? <HeaderModal setHeaderModal={setHeaderModal} /> : ``}
    </header>
  );
};

export default MobileHeader;
