import React, { useRef, useState } from "react";
import qs from "qs";
import "../../css/Register.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import MiniModal from "../utils/MiniModal";
import ModalContentsTitleWithMessage from "../utils/ModalContentsTitleWithMessage";
import getErrorMessage from "../utils/error";

const Register = () => {
  const location = useLocation();
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const [queryErrorCode, setQueryErrorCode] = useState(query.errorCode);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const closeMiniModal = () => {
    setQueryErrorCode(null);
  };

  const [errorMessage, setErrorMessage] = useState({
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
  });
  const { emailError, passwordError, confirmPasswordError } = errorMessage;

  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { email, password, confirmPassword } = registerData;

  const validateInput = e => {
    const passwordRegex = new RegExp(
      "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@!%*#?&])[A-Za-z\\d$@!%*#?&]{10,42}$",
    );
    const { value, name } = e.target;
    switch (name) {
      case "email":
        setErrorMessage({
          ...errorMessage,
          emailError: "",
        });
        break;
      case "password":
        if (!passwordRegex.test(value)) {
          setErrorMessage({
            ...errorMessage,
            passwordError:
              "10~42자 영문 대 소문자, 숫자, 특수문자를 사용하세요.",
          });
        } else {
          setErrorMessage({
            ...errorMessage,
            passwordError: "",
          });
        }
        break;
      case "confirmPassword":
        if (password !== confirmPassword) {
          setErrorMessage({
            ...errorMessage,
            confirmPasswordError: "비밀번호가 일치하지 않습니다.",
          });
        } else
          setErrorMessage({
            ...errorMessage,
            confirmPasswordError: "",
          });
        break;
      default:
        break;
    }
  };

  const onChange = e => {
    const { value, name } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
  };

  const sendRegisterData = async () => {
    if (emailError) {
      emailRef.current.focus();
    } else if (passwordError) {
      passwordRef.current.focus();
    } else if (confirmPasswordError) {
      confirmPasswordRef.current.focus();
    } else {
      await axios
        .post(`${process.env.REACT_APP_API}/users/create`, {
          headers: {
            "Content-type": "application/x-www-form-urlencoded",
          },
          email,
          password,
        })
        .then(() => {
          window.location.replace("/login");
        })
        .catch(error => {
          const { errorCode } = error.response.data;
          if (errorCode === 203) {
            setErrorMessage({
              ...errorMessage,
              emailError: "중복된 이메일 입니다.",
            });
          } else if (errorCode === 205) {
            setErrorMessage({
              ...errorMessage,
              passwordError: "잘못된 패스워드 형식 입니다.",
            });
          }
        });
    }
  };

  const onKeyPress = e => {
    if (e.key === "Enter") {
      sendRegisterData();
    }
  };

  return (
    <main>
      {queryErrorCode && (
        <MiniModal closeModal={closeMiniModal}>
          <ModalContentsTitleWithMessage
            closeModal={closeMiniModal}
            title={
              getErrorMessage("register", parseInt(queryErrorCode, 10)).title
            }
            message={
              getErrorMessage("register", parseInt(queryErrorCode, 10)).content
            }
          />
        </MiniModal>
      )}
      <section className="banner main-img">
        <div className="main-banner register-banner">
          <div className="register-main">
            <p className="register-header" align="center">
              회원가입
            </p>
            <form className="register-form">
              <input
                className="register-input"
                name="email"
                type="email"
                align="center"
                placeholder="이메일"
                value={email}
                onChange={onChange}
                onBlur={validateInput}
                ref={emailRef}
              />
              {emailError && (
                <div className="register-err" align="center">
                  {emailError}
                </div>
              )}
              <input
                className="register-input"
                name="password"
                type="password"
                align="center"
                placeholder="비밀번호"
                value={password}
                onChange={onChange}
                onBlur={validateInput}
                ref={passwordRef}
              />
              {passwordError && (
                <div className="register-err" align="center">
                  {passwordError}
                </div>
              )}
              <input
                className="register-input"
                name="confirmPassword"
                type="password"
                align="center"
                placeholder="비밀번호 재입력"
                value={confirmPassword}
                onChange={onChange}
                onKeyPress={onKeyPress}
                onBlur={validateInput}
                ref={confirmPasswordRef}
              />
              {confirmPasswordError && (
                <div className="register-err" align="center">
                  {confirmPasswordError}
                </div>
              )}
              <button
                type="button"
                onClick={sendRegisterData}
                className="register-btn register-register"
                align="center"
              >
                회원가입
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Register;
