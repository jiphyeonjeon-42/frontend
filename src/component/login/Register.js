import React, { useRef, useState } from "react";
import "../../css/MainBanner.css";
import "../../css/Banner.css";
import "../../css/Register.css";
import axios from "axios";

const Register = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

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
        // ID 중복 체크
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
      console.log("test");
      await axios
        .post(`${process.env.REACT_APP_API}/users/create`, {
          headers: {
            "Content-type": "application/x-www-form-urlencoded",
          },
          email,
          password,
        })
        .then(() => {
          console.log("success");
          // window.location.replace("/");
        })
        .catch(error => {
          setErrorMessage(error.response.data);
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
      <section className="banner main-img">
        <div className="main-banner">
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
