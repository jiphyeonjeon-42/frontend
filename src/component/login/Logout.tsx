import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useResetRecoilState } from "recoil";
import { usePostAuthLogout } from "~/api/auth/usePostAuthLogout";
import { userAtom } from "~/atom/userAtom";

const Logout = () => {
  const resetUser = useResetRecoilState(userAtom);
  const requestLogout = usePostAuthLogout();

  useEffect(() => requestLogout(resetUser), []);

  return <Navigate to="/" replace={true} />;
};

export default Logout;
