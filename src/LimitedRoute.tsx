import { Navigate, Outlet } from "react-router-dom";
import NotFound from "./component/utils/NotFound";
import { useAtomValue } from "jotai";
import { userAtom } from "./atom/userAtom";

type Props = {
  isLoginOnly?: boolean;
  isAdminOnly?: boolean;
  isLogoutOnly?: boolean;
};

const LimitedRoute = ({ isLoginOnly, isAdminOnly, isLogoutOnly }: Props) => {
  const user = useAtomValue(userAtom);

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
