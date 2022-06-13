import React, { useState } from "react";
import "../../css/MainBanner.css";
import "../../css/Banner.css";
import "../../css/Login.css";
import axios from "axios";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loginData, setLoginData] = useState({
    id: "",
    password: "",
  });
  const { id, password } = loginData;

  const onChange = e => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setLoginData({
      ...loginData, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
  };

  const sendLoginData = async () => {
    await axios
      .post(`${process.env.REACT_APP_API}/auth/login`, {
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
        },
        id,
        password,
      })
      .then(() => {
        window.location.replace("/auth");
      })
      .catch(error => {
        setErrorMessage(error.response.data.message);
        console.log(errorMessage);
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
        <div className="main-banner">
          <div className="login-main">
            {errorMessage && (
              <div className="login-err" align="center">
                {errorMessage}
              </div>
            )}
            <p className="login-header" align="center">
              Sign in
            </p>
            <form
              className="login-form"
              method="post"
              action={`${process.env.REACT_APP_API}/auth/login`}
            >
              <input
                className="login-input"
                name="id"
                type="email"
                align="center"
                placeholder="Username"
                value={id}
                onChange={onChange}
              />
              <input
                className="login-input"
                name="password"
                type="password"
                align="center"
                placeholder="Password"
                value={password}
                onChange={onChange}
                onKeyPress={onKeyPress}
              />
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
