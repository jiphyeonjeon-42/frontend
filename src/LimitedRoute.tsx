/* eslint-disable react/no-unused-prop-types */
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import NotFound from "./component/utils/NotFound";

// TODO: 유니언 타입으로 변경
type Props = {
  isLoginOnly: boolean;
  isAdminOnly: boolean;
  isLogoutOnly: boolean;
};

const defaultProps = {
  isLoginOnly: false,
  isAdminOnly: false,
  isLogoutOnly: false,
};

const LimitedRoute = (props: Partial<Props>) => {
  const { isLoginOnly, isAdminOnly, isLogoutOnly } = {
    ...defaultProps,
    ...props,
  };
  // 로그인 정보를 확인
  // recoil 전역상태는 새로고침시 초기화되기 때문에 로컬스토리지 참고
  const user = JSON.parse(window.localStorage.getItem("user") ?? "{}");

  if (isAdminOnly && !user?.isAdmin) {
    return <NotFound />;
  }
  if (isLoginOnly && !user?.isLogin) {
    return <Navigate to="/login" />;
  }
  if (isLogoutOnly && user?.isLogin) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default LimitedRoute;
