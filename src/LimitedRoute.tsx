import { Navigate, Outlet } from "react-router-dom";
import NotFound from "./component/utils/NotFound";

type Props = {
  isLoginOnly?: boolean;
  isAdminOnly?: boolean;
  isLogoutOnly?: boolean;
};

const LimitedRoute = ({
  isLoginOnly,
  isAdminOnly,
  isLogoutOnly,
}: Props) => {
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

LimitedRoute.defaultProps = {
  isLoginOnly: false,
  isAdminOnly: false,
  isLogoutOnly: false,
};
