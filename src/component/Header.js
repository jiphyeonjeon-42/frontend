import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Logo from "../img/jiphyeonjeon_logo.svg";
import Information from "../img/information_icon.svg";
import Login from "../img/login_icon.svg";
import Admin from "../img/admin_icon.svg";
import "../css/Header.css";
import userState from "../atom/userState";

const Header = () => {
  const [toggleLNB, setToggleLNB] = useState(false);
  const user = useRecoilValue(userState);
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
          {user.isLogin && (
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
                      <div className="lnb__circle__reservation" />
                    </div>
                  </div>
                  <ul className="lnb__menu">
                    <li className="lnb__loan">
                      <Link
                        className="lnb__text font-18 color-ff"
                        to={{ pathname: `/rent` }}
                      >
                        대출
                      </Link>
                    </li>
                    <li className="lnb__return">
                      <Link
                        className="lnb__text font-18 color-ff"
                        to={{ pathname: `/return` }}
                      >
                        조회 및 반납
                      </Link>
                    </li>
                    <li className="lnb__text lnb__reservation">
                      <Link
                        className="font-18 color-ff"
                        to={{ pathname: `/reservation` }}
                      >
                        예약 대출
                      </Link>
                    </li>
                  </ul>
                </div>
              ) : (
                ``
              )}
            </li>
          )}
          <li>
            {user.id ? (
              <Link className="gnb__login" to={{ pathname: `/logout` }}>
                <img src={Login} className="gnb__login__icon" alt="login" />
                <span className="gnb__login__text">로그아웃</span>{" "}
              </Link>
            ) : (
              <a
                className="gnb__login"
                href={`${process.env.REACT_APP_API}/auth/oauth`}
              >
                <img src={Login} className="gnb__login__icon" alt="login" />

                <span className="gnb__login__text">로그인</span>
              </a>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
