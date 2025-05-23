import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../hook/useApi";
import { useNewDialog } from "../../hook/useNewDialog";

type RegisterDataItem = {
  value: string;
  error: string;
  ref: React.RefObject<HTMLInputElement>;
};

export const usePostUsersCreate = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const [registerData, setRegisterData] = useState<{
    [key: string]: RegisterDataItem;
  }>({
    email: { value: "", error: "", ref: emailRef },
    password: { value: "", error: "", ref: passwordRef },
    confirmPassword: { value: "", error: "", ref: confirmPasswordRef },
  });

  const { request } = useApi("post", "users/create", {
    email: registerData.email.value,
    password: registerData.password.value,
  });
  const navigate = useNavigate();
  const { addDialogWithTitleAndMessage, addErrorDialog } = useNewDialog();

  const displaySuccess = () => {
    addDialogWithTitleAndMessage(
      "key-user-signup",
      "회원가입 완료",
      "환영합니다. 로그인 후 집현전 서비스를 이용하세요.",
      () => navigate("/login"),
    );
  };

  const displayError = (error: any) => {
    const errorCode = error.response?.data.errorCode;
    if (errorCode === 203) {
      setRegisterData({
        ...registerData,
        email: {
          ...registerData.email,
          error: "중복된 이메일 입니다.",
        },
      });
      registerData.email.ref.current?.focus();
      return;
    }
    if (errorCode === 205) {
      setRegisterData({
        ...registerData,
        password: {
          ...registerData.password,
          error: "잘못된 패스워드 형식입니다",
        },
      });
      registerData.password.ref.current?.focus();
      return;
    }
    addErrorDialog(error);
  };

  const requestRegister = () => {
    request(displaySuccess, displayError);
  };

  return { registerData, requestRegister, setRegisterData };
};
