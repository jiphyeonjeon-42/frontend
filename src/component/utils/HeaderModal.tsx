import { useRecoilValue } from "recoil";
import { Link } from "react-router-dom";
import userState from "../../atom/userState";
import Image from "./Image";
import {
  basicGnbMenu,
  adminLnbMenu,
  loginLnbMenu,
} from "../../data/headerMenu";
import CloseButton from "../../img/x_button_grey.svg";
import User from "../../img/Freepik_user.png";
import "../../css/HeaderModal.css";

type Props = {
  setHeaderModal(...args: unknown[]): unknown;
};

const HeaderModal = ({ setHeaderModal }: Props) => {
  const user = useRecoilValue(userState);
  const closeHeaderModal = () => {
    setHeaderModal(false);
  };

  if (!user.isLogin)
    return (
      <div>
        <button
          className="header-modal__background"
          type="button"
          onClick={closeHeaderModal}
          label="header-modal-background"
        />
        <div className="header-modal">
          <div className="header-modal__container">
            <div className="header-modal__user-container">
              <button
                className="header-modal__close-button"
                type="button"
                onClick={closeHeaderModal}
              >
                <Image
                  className="header-modal__icon-close"
                  src={CloseButton}
                  alt="close"
                />
              </button>
              <div className="header-modal__user">
                <Image
                  src={User}
                  className="header-modal__anonymous__icon"
                  alt="user"
                />
                <span className="profile__text font-20-bold color-ff">
                  익명
                </span>
              </div>
            </div>
            <div className="header-modal__button-container">
              {basicGnbMenu.map(menu => {
                const isLogin = menu.text === "로그인";
                if (!menu.isForMobile) return null;
                return (
                  <>
                    {isLogin && <div className="header-modal__line" />}
                    <Link className="header-modal__button" to={menu.linkTo}>
                      <Image
                        src={menu.mobileImg}
                        className={`header-modal__icon${isLogin ? "-in" : ""}`}
                        alt={menu.imgAlt}
                      />
                      <span className="header-modal__text font-16 color-2d">
                        {menu.text}
                      </span>
                    </Link>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  return (
    <div>
      <button
        className="header-modal__background"
        type="button"
        onClick={closeHeaderModal}
        label="header-modal-background"
      />
      <div className="header-modal">
        <div className="header-modal__container">
          <div className="header-modal__user-container">
            <button
              className="header-modal__close-button"
              type="button"
              onClick={closeHeaderModal}
            >
              <Image
                className="header-modal__icon-close"
                src={CloseButton}
                alt="close"
              />
            </button>
            <div className="header-modal__user">
              <span
                className={`header-modal__${
                  user.isAdmin ? "admin" : "user"
                }__icon font-18 color-ff`}
              >
                {user.isAdmin ? "사서" : "유저"}
              </span>
              <span className="profile__text font-20-bold color-ff">
                {user.userName}
              </span>
            </div>
          </div>
          <div className="header-modal__button-container">
            {user.isAdmin &&
              adminLnbMenu.map((menu, index, allMenu) => {
                const isLastMenu = index === allMenu.length - 1;
                return (
                  <>
                    <Link className="header-modal__button" to={menu.linkTo}>
                      <Image
                        src={menu.mobileImg}
                        className={`header-modal__icon-${menu.idClassName}`}
                        alt={menu.imgAlt}
                      />
                      <span className="header-modal__text font-16 color-2d">
                        {menu.text}
                      </span>
                    </Link>
                    {isLastMenu && <div className="header-modal__line" />}
                  </>
                );
              })}
            {basicGnbMenu.map(menu => {
              const isLogin = menu.text === "로그인";
              if (!menu.isForMobile || isLogin) return null;
              return (
                <Link className="header-modal__button" to={menu.linkTo}>
                  <Image
                    src={menu.mobileImg}
                    className="header-modal__icon"
                    alt={menu.imgAlt}
                  />
                  <span className="header-modal__text font-16 color-2d">
                    {menu.text}
                  </span>
                </Link>
              );
            })}
            {loginLnbMenu.map(menu => {
              const isLogout = menu.text === "로그아웃";
              return (
                <>
                  {isLogout && <div className="header-modal__line" />}
                  <Link className="header-modal__button" to={menu.linkTo}>
                    <Image
                      src={menu.mobileImg}
                      className={`header-modal__icon${isLogout ? "-out" : ""}`}
                      alt={menu.imgAlt}
                    />
                    <span className="header-modal__text font-16 color-2d">
                      {menu.text}
                    </span>
                  </Link>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderModal;
