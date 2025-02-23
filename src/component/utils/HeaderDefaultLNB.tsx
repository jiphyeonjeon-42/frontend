import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Link, useLocation } from "react-router-dom";
import { adminLnbMenu, loginLnbMenu } from "~/constant/headerMenu";
import Image from "./Image";
import User from "~/asset/img/Uniconlabs.png";
import ToggleUser from "~/asset/img/UniconlabsFill.png";
import ToggleDownArrow from "~/asset/img/caret-down_DaveGandy.png";
import DownArrow from "~/asset/img/drop-down_Freepik.png";
import "~/asset/css/HeaderDefaultLNB.css";
import { userAtom } from "~/atom/userAtom";

const HeaderDefaultLNB = () => {
  const [isLNBOpened, setIsLNBOpened] = useState(false);
  const user = useRecoilValue(userAtom);
  const location = useLocation();

  useEffect(() => {
    setIsLNBOpened(false);
  }, [location.pathname]);

  const lnbMenu = user.isAdmin
    ? [...adminLnbMenu, ...loginLnbMenu]
    : loginLnbMenu;

  return (
    <div className="header__gnb__menu">
      <button
        className="header__lnb-toggle"
        type="button"
        onClick={() => setIsLNBOpened(!isLNBOpened)}
      >
        <Image
          src={isLNBOpened ? ToggleUser : User}
          className="header__gnb__icon"
          alt="user"
        />
        <span>{user.userName}</span>
        <Image
          src={isLNBOpened ? ToggleDownArrow : DownArrow}
          className="header__gnb__icon dropdown"
          alt="dropdown"
        />
      </button>
      {isLNBOpened && (
        <div className="header__lnb-menu__wrapper">
          {lnbMenu.map(menu => (
            <Link
              className="header__lnb-menu__item"
              key={menu.linkTo}
              to={menu.linkTo}
            >
              <span className="header__lnb-menu__text">{menu.text}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default HeaderDefaultLNB;
