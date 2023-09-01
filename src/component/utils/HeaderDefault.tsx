import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { Link, useLocation } from "react-router-dom";
import userState from "../../atom/userState";
import Image from "./Image";
import {
  basicGnbMenu,
  adminLnbMenu,
  loginLnbMenu,
} from "../../constant/headerMenu";
import Logo from "../../asset/img/jiphyeonjeon_logo.svg";
import User from "../../asset/img/Uniconlabs.png";
import ToggleUser from "../../asset/img/UniconlabsFill.png";
import ToggleDownArrow from "../../asset/img/caret-down_DaveGandy.png";
import DownArrow from "../../asset/img/drop-down_Freepik.png";
import "../../asset/css/HeaderDefault.css";

const HeaderDefault = () => {
  const user = useRecoilValue(userState);
  const [toggleLNB, setToggleLNB] = useState(false);
  const [hoverLNB, setHoverLNB] = useState(false);
  const location = useLocation();

  const clickUserButton = () => {
    setToggleLNB(!toggleLNB);
  };

  const closeHeader = () => {
    setToggleLNB(false);
  };

  useEffect(closeHeader, [location.pathname]);

  if (!user.isLogin)
    return (
      <header className="header">
        <section className="header-wrapper">
          <div className="header__logo">
            <Link to="/">
              <Image src={Logo} className="logo_img" alt="logo" />
            </Link>
          </div>
          <nav className="header__gnb">
            <ul className="gnb__menu">
              {basicGnbMenu.map(menu => {
                return (
                  <li key={menu.linkTo}>
                    <Link className="gnb__button" to={menu.linkTo}>
                      <Image
                        src={menu.img}
                        className="gnb__icon gnb__info__icon"
                        alt={menu.imgAlt}
                      />
                      <span className="gnb__text font-18">{menu.text}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </section>
      </header>
    );
  return (
    <header className="header">
      <section className="header-wrapper">
        <div className="header__logo">
          <Link to="/">
            <Image src={Logo} className="logo_img" alt="logo" />
          </Link>
        </div>
        <nav className="header__gnb">
          <ul className="gnb__menu">
            {basicGnbMenu.map(menu => {
              if (menu.text === "로그인") return null; // 로그인되어 있으면 로그인 메뉴는 숨기기
              return (
                <li key={menu.linkTo}>
                  <Link className="gnb__button" to={menu.linkTo}>
                    <Image
                      src={menu.img}
                      className="gnb__icon gnb__info__icon"
                      alt={menu.imgAlt}
                    />
                    <span className="gnb__text font-18">{menu.text}</span>
                  </Link>
                </li>
              );
            })}
            <li>
              <div>
                <button
                  className="gnb__user__button"
                  type="button"
                  onClick={clickUserButton}
                  onMouseOver={() => setHoverLNB(true)}
                  onFocus={() => setHoverLNB(true)}
                  onMouseLeave={() => setHoverLNB(false)}
                >
                  <Image
                    src={toggleLNB ? ToggleUser : User}
                    className="gnb__icon gnb__user__icon"
                    alt="user"
                  />
                  <span className="gnb__text font-18 gnb__user__text">
                    {user.userName}
                  </span>
                  <Image
                    src={toggleLNB || hoverLNB ? ToggleDownArrow : DownArrow}
                    className="gnb__icon gnb__dropdown__icon"
                    alt="dropdown"
                  />
                </button>
                {toggleLNB && (
                  /* 토글 시작 */
                  <div className="gnb__user__lnb">
                    <div className="lnb__line" />
                    <ul className="lnb__menu">
                      {user.isAdmin &&
                        adminLnbMenu.map(menu => {
                          return (
                            <li className="lnb__menu_button" key={menu.linkTo}>
                              <Link
                                className="lnb__text font-16 color-ff"
                                to={menu.linkTo}
                              >
                                {menu.text}
                              </Link>
                              <div className="lnb__circle" />
                            </li>
                          );
                        })}
                      {loginLnbMenu.map(menu => {
                        return (
                          <li className="lnb__menu_button" key={menu.linkTo}>
                            <Link
                              className="lnb__text font-16 color-ff"
                              to={menu.linkTo}
                            >
                              {menu.text}
                            </Link>
                            <div className="lnb__circle" />
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  /* 토글 끝 */
                )}
              </div>
            </li>
          </ul>
        </nav>
      </section>
    </header>
  );
};

export default HeaderDefault;
