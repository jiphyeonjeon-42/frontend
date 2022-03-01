import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { Link } from "react-router-dom";
import Logo from "../../img/jiphyeonjeon_logo.svg";
// import Information from "../../img/information_icon.svg";
import Hamburger from "../../img/Hamburger_OwlDsgnr.png";
import SearchBook from "../../img/Search_VectorsMarket.png";
// import ToggleDownArrow from "../../img/caret-down_DaveGandy.png";
// import DownArrow from "../../img/drop-down_Freepik.png";
// // import Book from "../../img/admin_icon.svg";
import "../../css/MobileHeader.css";
import userState from "../../atom/userState";

const Header = () => {
  const user = useRecoilValue(userState);
  const [toggleLNB, setToggleLNB] = useState(false);
  // const [hoverLNB, setHoverLNB] = useState(false);

  const clickUserButton = () => {
    setToggleLNB(!toggleLNB);
  };

  const getHost = () => {
    return `${window.location.protocol}//${window.location.host}`;
  };

  const nowDate = new Date();
  const expireDate = new Date(user.expire);
  if (nowDate > expireDate)
    window.location = `${
      process.env.REACT_APP_API
    }/auth/oauth?clientURL=${getHost()}`;

  return (
    <header className="mobile-header">
      <section className="m-header">
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
              {user.id ? (
                <div>
                  <button
                    className="m-header__hamburger-button"
                    type="button"
                    onClick={clickUserButton}
                    // onMouseOver={() => setHoverLNB(true)}
                    // onFocus={() => setHoverLNB(true)}
                    // onMouseLeave={() => setHoverLNB(false)}
                  >
                    {/* <span className="gnb__text font-18 gnb__user__text">
                      {user.userId}
                    </span> */}
                    <img
                      src={Hamburger}
                      className="gnb__hamburger__icon"
                      alt="dropdown"
                    />
                  </button>
                  {toggleLNB ? (
                    <div className="gnb__user__lnb">
                      <div className="lnb__line__circle">
                        <div className="lnb__line" />
                        <div className="lnb__circle">
                          <div className="lnb__circle__shape lnb__circle__rent" />
                          <div className="lnb__circle__shape lnb__circle__return" />
                          <div className="lnb__circle__shape lnb__circle__reservation" />
                        </div>
                      </div>
                      <ul className="lnb__menu">
                        <li className="lnb__rent">
                          <Link
                            className="lnb__text font-16 color-ff"
                            to={{ pathname: `/rent` }}
                          >
                            도서관리
                          </Link>
                        </li>
                        <li className="lnb__return">
                          <Link
                            className="lnb__text font-16 color-ff"
                            to={{ pathname: `/return` }}
                          >
                            마이페이지
                          </Link>
                        </li>
                        <li className="lnb__reservation">
                          <Link
                            className="lnb__text font-16 color-ff"
                            to={{ pathname: `/logout` }}
                          >
                            로그아웃
                          </Link>
                        </li>
                      </ul>
                    </div>
                  ) : (
                    ``
                  )}
                </div>
              ) : (
                <a
                  className="m-header__hamburger-button"
                  href={`${
                    process.env.REACT_APP_API
                  }/auth/oauth?clientURL=${getHost()}`}
                >
                  {/* <span className="gnb__text font-18">로그인</span> */}
                  <img
                    src={Hamburger}
                    className="gnb__hamburger__icon"
                    alt="user"
                  />
                </a>
              )}
            </li>
          </ul>
        </nav>
      </section>
    </header>
  );
};

export default Header;
