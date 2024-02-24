import { Navigate, Outlet } from "react-router-dom";
import NotFound from "./component/utils/NotFound";
import { useRecoilValue } from "recoil";
import { userAtom } from "./atom/userAtom";

type Props = {
  isLoginOnly?: boolean;
  isAdminOnly?: boolean;
  isLogoutOnly?: boolean;
};

const LimitedRoute = ({ isLoginOnly, isAdminOnly, isLogoutOnly }: Props) => {
  const user = useRecoilValue(userAtom);

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
