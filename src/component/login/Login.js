import React, { useRef } from "react";
import usePostAuthLogin from "../../api/auth/usePostAuthLogin";
import "../../css/MainBanner.css";
import "../../css/Banner.css";
import "../../css/Login.css";

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const { id, password, setLogin, requestLogin, message, setMessage } =
    usePostAuthLogin();

  const submitLogin = e => {
    e.preventDefault();
    if (!id) {
      emailRef.current.focus();
      setMessage("이메일을 입력해 주세요.");
      return;
    }
    if (!password) {
      passwordRef.current.focus();
      setMessage("비밀번호를 입력해 주세요.");
      return;
    }
    requestLogin();
  };

  const onChange = e => {
    const { value, name } = e.currentTarget;
    setLogin(name, value);
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
                ref={passwordRef}
              />
              {message && (
                <div className="login-err" align="center">
                  {message}
                </div>
              )}
              <button
                type="submit"
                onClick={submitLogin}
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
