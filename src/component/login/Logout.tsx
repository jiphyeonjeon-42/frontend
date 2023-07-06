import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useResetRecoilState } from "recoil";
import { usePostAuthLogout } from "../../api/auth/usePostAuthLogout";
import userState from "../../atom/userState";

const Logout = () => {
  const resetState = useResetRecoilState(userState);
  const requestLogout = usePostAuthLogout();

  useEffect(() => {
    requestLogout(() => {
      resetState();
      window.localStorage.removeItem("user");
    });
  }, []);

  return (
    <>
      <Navigate to="/" replace={true} />
    </>
  );
};

export default Logout;
