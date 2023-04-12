import usePostUsersCreate from "../../api/users/usePostUsersCreate";
import { registerRule } from "../../data/validate";
import "../../css/Register.css";

const Register = () => {
  const { registerData, setRegisterData, requestRegister, Dialog } =
    usePostUsersCreate();

  const validateInput = (value, name) => {
    return (
      value.length > 0 &&
      registerRule[name].validator(value, registerData.password.value)
    );
  };

  const checkValidation = (value, name) => {
    const rule = registerRule[name];

    if (validateInput(value, name)) {
      setRegisterData({
        ...registerData,
        [name]: { ...registerData[name], value, error: "" },
      });
      return true;
    }
    setRegisterData({
      ...registerData,
      [name]: {
        ...registerData[name],
        value,
        error: value.length ? rule.invalidMessage : rule.emptyMessage,
      },
    });
    registerData[name].ref.current.focus();
    return false;
  };

  const onChange = e => {
    const { value, name } = e.currentTarget;
    checkValidation(value, name);
  };

  const submitRegister = e => {
    e.preventDefault();
    const isAllValid = Object.keys(registerData).every(name =>
      checkValidation(registerData[name].value, name),
    );
    if (isAllValid) requestRegister();
  };

  return (
    <main>
      <Dialog />
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
                value={registerData.email.value}
                onChange={onChange}
                ref={registerData.email.ref}
              />
              {registerData.email.error && (
                <div className="register-err" align="center">
                  {registerData.email.error}
                </div>
              )}
              <input
                className="register-input"
                name="password"
                type="password"
                align="center"
                placeholder="비밀번호"
                value={registerData.password.value}
                onChange={onChange}
                ref={registerData.password.ref}
              />
              {registerData.password.error && (
                <div className="register-err" align="center">
                  {registerData.password.error}
                </div>
              )}
              <input
                className="register-input"
                name="confirmPassword"
                type="password"
                align="center"
                placeholder="비밀번호 재입력"
                value={registerData.confirmPassword.value}
                onChange={onChange}
                ref={registerData.confirmPassword.ref}
              />
              {registerData.confirmPassword.error && (
                <div className="register-err" align="center">
                  {registerData.confirmPassword.error}
                </div>
              )}
              <button
                type="submit"
                onClick={submitRegister}
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
