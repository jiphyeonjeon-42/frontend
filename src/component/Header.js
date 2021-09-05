import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../img/jiphyeonjeon_logo.svg";
import Information from "../img/information_icon.svg";
import Login from "../img/login_icon.svg";
import Admin from "../img/admin_icon.svg";
import "../css/Header.css";

const Header = () => {
  const [toggleLNB, setToggleLNB] = useState(false);
  const clickAdmin = () => {
    const target = document.querySelector(".gnb__admin__text");
    target.style.opacity = toggleLNB === true ? 1 : 0.7;
    setToggleLNB(!toggleLNB);
  };
  return (
    <header className="header">
      <div className="header__logo">
        <Link className="logo__link" to={{ pathname: `/` }}>
          <img src={Logo} className="logo_img" alt="logo" />
        </Link>
      </div>
      <nav className="header__gnb">
        <ul className="gnb__menu">
          <li>
            <Link className="gnb__info" to={{ pathname: `/infomation` }}>
              <img
                src={Information}
                className="gnb__info__icon"
                alt="infomation"
              />
              <span className="gnb__info__text">이용안내</span>
            </Link>
          </li>
          <li className="gnb__admin">
            <button
              className="gnb__admin__button"
              type="button"
              onClick={clickAdmin}
            >
              <img src={Admin} className="gnb__admin__icon" alt="admin" />
              <span className="gnb__admin__text">대출/반납</span>
            </button>
            {toggleLNB ? (
              <div className="gnb__admin__lnb">
                <div className="lnb__line__circle">
                  <div className="lnb__line" />
                  <div className="lnb__circle">
                    <div className="lnb__circle__loan" />
                    <div className="lnb__circle__return" />
                  </div>
                </div>
                <ul className="lnb__menu">
                  <Link to={{ pathname: `/loan` }}>
                    <li className="lnb__loan">대출</li>
                  </Link>
                  <Link to={{ pathname: `/return` }}>
                    <li className="lnb__return">조회 및 반납</li>
                  </Link>
                </ul>
              </div>
            ) : (
              <div className="gnb__admin__lnb" />
            )}
          </li>
          <li>
            <Link className="gnb__login" to={{ pathname: `/login` }}>
              <img src={Login} className="gnb__login__icon" alt="login" />
              <span className="gnb__login__text">로그인</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
