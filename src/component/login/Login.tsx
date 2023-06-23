import { ChangeEventHandler, FormEventHandler, useRef } from "react";
import  usePostAuthLogin  from "../../api/auth/usePostAuthLogin";
import "../../asset/css/MainBanner.css";
import "../../asset/css/Banner.css";
import "../../asset/css/Login.css";

const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { id, password, setLogin, requestLogin, message, setMessage } =
    usePostAuthLogin();

  const submitLogin: FormEventHandler = e => {
    e.preventDefault();
    if (!id) {
      emailRef.current?.focus();
      setMessage("이메일을 입력해 주세요.");
      return;
    }
    if (!password) {
      passwordRef.current?.focus();
      setMessage("비밀번호를 입력해 주세요.");
      return;
    }
    requestLogin();
  };

  const onChange: ChangeEventHandler<HTMLInputElement> = e => {
    const { value, name } = e.currentTarget;
    setLogin(name, value);
  };

  return (
    <main>
      <section className="banner main-img">
        <div className="main-banner login-banner">
          <div className="login-main">
            <p className="login-header">로그인</p>
            <form className="login-form">
              <input
                className="login-input"
                name="id"
                type="email"
                placeholder="이메일"
                value={id}
                onChange={onChange}
                ref={emailRef}
              />
              <input
                className="login-input"
                name="password"
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={onChange}
                ref={passwordRef}
              />
              {message && <div className="login-err">{message}</div>}
              <button type="submit" onClick={submitLogin} className="login-btn">
                로그인
              </button>
              <a
                href={`${import.meta.env.REACT_APP_API}/auth/oauth`}
                className="login-btn login-oauth"
              >
                42 intra 로그인
              </a>
              <a href="/register" className="login-btn login-register">
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
