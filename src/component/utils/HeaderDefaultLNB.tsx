import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Link, useLocation } from "react-router-dom";
import { adminLnbMenu, loginLnbMenu } from "~/constant/headerMenu";
import userState from "~/atom/userState";
import Image from "./Image";
import User from "~/asset/img/Uniconlabs.png";
import ToggleUser from "~/asset/img/UniconlabsFill.png";
import ToggleDownArrow from "~/asset/img/caret-down_DaveGandy.png";
import DownArrow from "~/asset/img/drop-down_Freepik.png";

const HeaderDefaultLNB = () => {
  const user = useRecoilValue(userState);
  const [isLNBOpened, setIsLNBOpened] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLNBOpened(false);
  }, [location.pathname]);

  return (
    <>
      <button
        className="gnb__user__button"
        type="button"
        onClick={() => setIsLNBOpened(!isLNBOpened)}
        onFocus={() => setIsLNBOpened(true)}
        onMouseOver={() => setIsLNBOpened(true)}
        onMouseLeave={() => setIsLNBOpened(false)}
      >
        <Image
          src={isLNBOpened ? ToggleUser : User}
          className="gnb__icon gnb__user__icon"
          alt="user"
        />
        <span className="gnb__text font-18 gnb__user__text">
          {user.userName}
        </span>
        <Image
          src={isLNBOpened ? ToggleDownArrow : DownArrow}
          className="gnb__icon gnb__dropdown__icon"
          alt="dropdown"
        />
      </button>
      {isLNBOpened && (
        /* 토글 시작 */
        <div
          className="gnb__user__lnb"
          onMouseEnter={() => setIsLNBOpened(true)}
          onMouseLeave={() => setIsLNBOpened(false)}
        >
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
                  <Link className="lnb__text font-16 color-ff" to={menu.linkTo}>
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
    </>
  );
};

export default HeaderDefaultLNB;
