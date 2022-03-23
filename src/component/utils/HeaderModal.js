import React from "react";
import { useRecoilValue } from "recoil";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import CloseButton from "../../img/x_button_grey.svg";
import userState from "../../atom/userState";
import Book from "../../img/admin_icon_black.svg";
import Information from "../../img/information_icon_black.svg";
import Mypage from "../../img/login_icon.svg";
import User from "../../img/Freepik_user.png";
import Login from "../../img/login_feen.png";
import Logout from "../../img/logout_IconsBox.png";
import "../../css/HeaderModal.css";

const HeaderModal = ({ setHeaderModal }) => {
  const user = useRecoilValue(userState);

  const closeHeaderModal = () => {
    setHeaderModal(false);
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
              <img
                className="header-modal__icon-close"
                src={CloseButton}
                alt="close"
              />
            </button>
            {user.id ? (
              <div className="header-modal__user">
                <span
                  className={`header-modal__${
                    user.isAdmin ? "admin" : "user"
                  }__icon font-18 color-ff`}
                >
                  {user.isAdmin ? "사서" : "유저"}
                </span>
                <span className="profile__text font-20-bold color-ff">
                  {user.userId}
                </span>
              </div>
            ) : (
              <div className="header-modal__user">
                <img
                  src={User}
                  className="header-modal__anonymous__icon"
                  alt="user"
                />
                {/* <span className="header-modal__user__icon font-18 color-ff">
                유저
              </span> */}
                <span className="profile__text font-20-bold color-ff">
                  익명
                </span>
              </div>
            )}
          </div>
          <div className="header-modal__button-container">
            {user.id && user.isAdmin ? (
              <Link className="header-modal__button" to={{ pathname: `/rent` }}>
                <img
                  src={Book}
                  className="header-modal__icon-book"
                  alt="book"
                />
                <span className="header-modal__text font-16 color-2d">
                  도서관리
                </span>
              </Link>
            ) : (
              ``
            )}
            {user.id && user.isAdmin ? (
              <div className="header-modal__line" />
            ) : (
              ``
            )}
            <Link
              className="header-modal__button"
              to={{ pathname: `/information` }}
            >
              <img
                src={Information}
                className="header-modal__icon"
                alt="information"
              />
              <span className="header-modal__text font-16 color-2d">
                이용안내
              </span>
            </Link>
            {user.id ? (
              <Link
                className="header-modal__button"
                to={{ pathname: `/return` }}
              >
                <img src={Mypage} className="header-modal__icon" alt="user" />
                <span className="header-modal__text font-16 color-2d">
                  마이페이지
                </span>
              </Link>
            ) : (
              ``
            )}
            <div className="header-modal__line" />
            {user.id ? (
              <Link
                className="header-modal__button"
                to={{ pathname: `/logout` }}
              >
                <img
                  src={Logout}
                  className="header-modal__icon-out"
                  alt="user"
                />
                <span className="header-modal__text font-16 color-2d">
                  로그아웃
                </span>
              </Link>
            ) : (
              <a
                className="header-modal__button"
                href={`${
                  process.env.REACT_APP_API
                }/auth/oauth?clientURL=${getHost()}`}
              >
                <img src={Login} className="header-modal__icon-in" alt="user" />
                <span className="header-modal__text font-16 color-2d">
                  로그인
                </span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

HeaderModal.propTypes = {
  setHeaderModal: PropTypes.func.isRequired,
};

export default HeaderModal;
