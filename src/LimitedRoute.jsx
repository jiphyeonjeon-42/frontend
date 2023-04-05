import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import NotFound from "./component/utils/NotFound";

const LimitedRoute = ({ isLoginOnly, isAdminOnly, isLogoutOnly }) => {
  // 로그인 정보를 확인
  // recoil 전역상태는 새로고침시 초기화되기 때문에 로컬스토리지 참고
  const user = JSON.parse(window.localStorage.getItem("user"));

  if (isAdminOnly && !user?.isAdmin) {
    return <NotFound />;
  }
  if (isLoginOnly && !user?.isLogin) {
    return <Navigate to="/login" replace={true} />;
  }
  if (isLogoutOnly && user?.isLogin) {
    return <Navigate to="/" replace={true} />;
  }
  return <Outlet />;
};

export default LimitedRoute;

LimitedRoute.propTypes = {
  isLoginOnly: PropTypes.bool,
  isAdminOnly: PropTypes.bool,
  isLogoutOnly: PropTypes.bool,
};

LimitedRoute.defaultProps = {
  isLoginOnly: false,
  isAdminOnly: false,
  isLogoutOnly: false,
};
