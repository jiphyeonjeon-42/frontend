import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import userState from "../../atom/userState";
import "../../css/MainBanner.css";
import "../../css/Banner.css";
import "../../css/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loginData, setLoginData] = useState({
    id: "",
    password: "",
  });
  const { id, password } = loginData;
  const user = useRecoilValue(userState);

  useEffect(() => {
    if (user.isLogin) navigate("/");
  }, [user]);

  const onChange = e => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setLoginData({
      ...loginData, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
  };

  const sendLoginData = async () => {
    if (!id || !password) {
      if (!id) {
        emailRef.current.focus();
        setErrorMessage("이메일을 입력해 주세요.");
      } else if (!password) {
        passwordRef.current.focus();
        setErrorMessage("비밀번호를 입력해 주세요.");
      }
      return;
    }
    await axios
      .post(`${process.env.REACT_APP_API}/auth/login`, {
        id,
        password,
      })
      .then(() => {
        navigate("/auth");
      })
      .catch(error => {
        const { errorCode } = error.response.data;
        if (errorCode === 103) setErrorMessage("입력된 값이 없습니다.");
        else if (errorCode === 104) setErrorMessage("잘못된 패스워드입니다.");
        else if (errorCode === 107) setErrorMessage("존재하지 않는 ID 입니다.");
      });
  };

  const onKeyPress = e => {
    if (e.key === "Enter") {
      sendLoginData();
    }
  };

  return (
    <main>
      <section className="banner main-img">
        <div className="main-banner login-banner">
          <div className="login-main">
            <p className="login-header" align="center">
              로그인
            </p>
            <form className="login-form">
              <input
                className="login-input"
                name="id"
                type="email"
                align="center"
                placeholder="이메일"
                value={id}
                onChange={onChange}
                ref={emailRef}
              />
              <input
                className="login-input"
                name="password"
                type="password"
                align="center"
                placeholder="비밀번호"
                value={password}
                onChange={onChange}
                onKeyPress={onKeyPress}
                ref={passwordRef}
              />
              {errorMessage && (
                <div className="login-err" align="center">
                  {errorMessage}
                </div>
              )}
              <button
                type="button"
                onClick={sendLoginData}
                className="login-btn"
                align="center"
              >
                로그인
              </button>
              <a
                href={`${process.env.REACT_APP_API}/auth/oauth`}
                className="login-btn login-oauth"
                align="center"
              >
                42 intra 로그인
              </a>
              <a
                href="/register"
                className="login-btn login-register"
                align="center"
              >
                회원가입
              </a>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
