import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { Link } from "react-router-dom";
import Logo from "../../img/jiphyeonjeon_logo.svg";
import Information from "../../img/information_icon.svg";
import User from "../../img/Uniconlabs.png";
import ToggleUser from "../../img/UniconlabsFill.png";
import ToggleDownArrow from "../../img/caret-down_DaveGandy.png";
import DownArrow from "../../img/drop-down_Freepik.png";
import Book from "../../img/admin_icon.svg";
import "../../css/Header.css";
import userState from "../../atom/userState";

const Header = () => {
  const user = useRecoilValue(userState);
  const [toggleLNB, setToggleLNB] = useState(false);
  const [hoverLNB, setHoverLNB] = useState(false);

  const clickUserButton = () => {
    setToggleLNB(!toggleLNB);
  };

  const nowDate = new Date();
  const expireDate = new Date(user.expire);
  if (nowDate > expireDate) window.location = `/login`;

  return (
    <header className="header">
      <section className="header-wrapper">
        <div className="header__logo">
          <Link to={{ pathname: `/` }}>
            <img src={Logo} className="logo_img" alt="logo" />
          </Link>
        </div>
        <nav className="header__gnb">
          <ul className="gnb__menu">
            <li>
              <Link className="gnb__button" to={{ pathname: `/information` }}>
                <img
                  src={Information}
                  className="gnb__icon gnb__info__icon"
                  alt="information"
                />
                <span className="gnb__text font-18">이용안내</span>
              </Link>
            </li>
            <li>
              <Link className="gnb__button" to={{ pathname: `/search` }}>
                <img
                  src={Book}
                  className="gnb__icon gnb__book__icon"
                  alt="book"
                />
                <span className="gnb__text font-18">도서목록</span>
              </Link>
            </li>
            <li>
              {user.isLogin ? (
                <div>
                  <button
                    className="gnb__user__button"
                    type="button"
                    onClick={clickUserButton}
                    onMouseOver={() => setHoverLNB(true)}
                    onFocus={() => setHoverLNB(true)}
                    onMouseLeave={() => setHoverLNB(false)}
                  >
                    <img
                      src={toggleLNB ? ToggleUser : User}
                      className="gnb__icon gnb__user__icon"
                      alt="user"
                    />
                    <span className="gnb__text font-18 gnb__user__text">
                      {user.userId}
                    </span>
                    <img
                      src={toggleLNB || hoverLNB ? ToggleDownArrow : DownArrow}
                      className="gnb__icon gnb__dropdown__icon"
                      alt="dropdown"
                    />
                  </button>
                  {toggleLNB ? (
                    <div className="gnb__user__lnb">
                      <div className="lnb__line" />
                      <ul className="lnb__menu">
                        {user.isAdmin ? (
                          <li className="lnb__menu_button">
                            <Link
                              className="lnb__text font-16 color-ff"
                              to={{ pathname: `/rent` }}
                            >
                              대출/반납
                            </Link>
                            <div className="lnb__circle" />
                          </li>
                        ) : (
                          ``
                        )}
                        {user.isAdmin ? (
                          <li className="lnb__menu_button">
                            <Link
                              className="lnb__text font-16 color-ff"
                              to={{ pathname: `/user` }}
                            >
                              DB 관리
                            </Link>
                            <div className="lnb__circle" />
                          </li>
                        ) : (
                          ``
                        )}
                        <li className="lnb__menu_button">
                          <Link
                            className="lnb__text font-16 color-ff"
                            to={{ pathname: `/mypage` }}
                          >
                            마이페이지
                          </Link>
                          <div className="lnb__circle" />
                        </li>
                        <li className="lnb__menu_button">
                          <Link
                            className="lnb__text font-16 color-ff"
                            to={{ pathname: `/logout` }}
                          >
                            로그아웃
                          </Link>
                          <div className="lnb__circle" />
                        </li>
                      </ul>
                    </div>
                  ) : (
                    ``
                  )}
                </div>
              ) : (
                <a className="gnb__button" href="/login">
                  <img
                    src={User}
                    className="gnb__icon gnb__user__icon"
                    alt="user"
                  />
                  <span className="gnb__text font-18">로그인</span>
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
