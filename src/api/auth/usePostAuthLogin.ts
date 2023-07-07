import { useState } from "react";
import { useNavigate } from "react-router-dom";
import getErrorMessage from "../../constant/error";
import useApi from "../../hook/useApi";

const usePostAuthLogin = () => {
  const [loginData, setLoginData] = useState({
    id: "",
    password: "",
    message: "",
  });

  const setLogin = (key: string, value: string) => {
    setLoginData({ ...loginData, [key]: value });
  };
  const setMessage = (message: string) => {
    setLoginData({ ...loginData, message });
  };

  const { request } = useApi("post", "auth/login", {
    id: loginData.id,
    password: loginData.password,
  });

  const navigate = useNavigate();
  const onSuccess = () => {
    navigate("/auth", { replace: true });
  };

  const onError = (error: any) => {
    const errorCode = parseInt(error?.response?.data?.errorCode, 10);
    if (errorCode === 103) setMessage("입력된 값이 없습니다.");
    else if (errorCode === 104) setMessage("잘못된 패스워드입니다.");
    else if (errorCode === 107) setMessage("존재하지 않는 ID 입니다.");
    else setMessage(getErrorMessage(errorCode));
  };

  const requestLogin = () => {
    request(onSuccess, onError);
  };

  return {
    id: loginData.id,
    password: loginData.password,
    setLogin,
    requestLogin,
    message: loginData.message,
    setMessage,
  };
};

export default usePostAuthLogin;
