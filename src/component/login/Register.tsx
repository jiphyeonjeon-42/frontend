import { ChangeEventHandler, FormEventHandler } from "react";
import { usePostUsersCreate } from "../../api/users/usePostUsersCreate";
import "../../asset/css/Register.css";
import { registerRule } from "../../constant/validate";

const Register = () => {
  const { registerData, setRegisterData, requestRegister } =
    usePostUsersCreate();

  const validateInput = (value: string, name: string) => {
    const rule = registerRule[name];
    const result = rule.validator(value, registerData.password.value);

    if (value.length === 0) {
      return rule.emptyMessage;
    }
    return result;
  };

  const checkIsValid = (value: string, name: string) => {
    const errorResult = validateInput(value, name);
    const isValid = errorResult === null;
    const error = isValid ? "" : errorResult;

    setRegisterData({
      ...registerData,
      [name]: { ...registerData[name], value, error },
    });
    if (!isValid) {
      registerData[name].ref.current?.focus();
    }
    return isValid;
  };

  const onChange: ChangeEventHandler<HTMLInputElement> = e => {
    const { value, name } = e.currentTarget;
    checkIsValid(value, name);
  };

  const submitRegister: FormEventHandler<HTMLButtonElement> = e => {
    e.preventDefault();
    const isAllValid = Object.keys(registerData).every(name =>
      checkIsValid(registerData[name].value, name),
    );
    if (isAllValid) requestRegister();
  };

  return (
    <main>
      <section className="banner main-img">
        <div className="main-banner register-banner">
          <div className="register-main">
            <p className="register-header">회원가입</p>
            <form className="register-form">
              <input
                className="register-input"
                name="email"
                type="email"
                placeholder="이메일"
                value={registerData.email.value}
                onChange={onChange}
                ref={registerData.email.ref}
              />
              {registerData.email.error && (
                <div className="register-err">{registerData.email.error}</div>
              )}
              <input
                className="register-input"
                name="password"
                type="password"
                placeholder="비밀번호"
                value={registerData.password.value}
                onChange={onChange}
                ref={registerData.password.ref}
              />
              {registerData.password.error && (
                <div className="register-err">
                  {registerData.password.error}
                </div>
              )}
              <input
                className="register-input"
                name="confirmPassword"
                type="password"
                placeholder="비밀번호 재입력"
                value={registerData.confirmPassword.value}
                onChange={onChange}
                ref={registerData.confirmPassword.ref}
              />
              {registerData.confirmPassword.error && (
                <div className="register-err">
                  {registerData.confirmPassword.error}
                </div>
              )}
              <button
                type="submit"
                onClick={submitRegister}
                className="register-btn register-register"
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
