import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import PropTypes from "prop-types";
import NotFound from "./component/utils/NotFound";
import userState from "./atom/userState";

const LimitedRoute = ({ isLoginOnly, isAdminOnly, isLogoutOnly }) => {
  const user = useRecoilValue(userState);

  if (isAdminOnly && !user.isAdmin) {
    return <NotFound />;
  }
  if (isLoginOnly && !user.isLogin) {
    return <Navigate to="/login" />;
  }
  if (isLogoutOnly && user.isLogin) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default LimitedRoute;

LimitedRoute.propTypes = {
  isLoginOnly: PropTypes.bool,
  isLogoutOnly: PropTypes.bool,
  isAdminOnly: PropTypes.bool,
};

LimitedRoute.defaultProps = {
  isLoginOnly: false,
  isLogoutOnly: false,
  isAdminOnly: false,
};
