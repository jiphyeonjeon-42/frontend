import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useGetAuthMe } from "../../api/auth/useGetAuthMe";

const Auth = () => {
  const getMe = useGetAuthMe();

  useEffect(() => {
    getMe();
  }, []);

  return <Navigate to="/" replace={true} />;
};
export default Auth;
