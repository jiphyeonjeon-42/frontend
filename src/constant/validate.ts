export const passwordPattern =
  "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$&+,:;=?@#|'<>.^*()%!-])[A-Za-z\\d$&+,:;=?@#|'<>.^*()%!-]{10,42}$";
export const emailPattern = "^\\w+([.-]?\\w+)*@\\w+([.-]?\\w+)*(.\\w{2,3})+$";

const passwordMessage = "10~42자 영문 대 소문자, 숫자, 특수문자를 사용하세요.";

export const registerRule: Record<
  string,
  {
    validator: (x: string, y: string) => string | null;
    emptyMessage: string;
  }
> = {
  email: {
    validator: (email: string) => {
      if (!RegExp(emailPattern).test(email)) {
        return "이메일 형식이 아닙니다.";
      }
      if (email.endsWith("@student.42seoul.kr")) {
        return "42 인트라 로그인을 이용해 주세요.";
      }
      return null;
    },
    emptyMessage: "이메일을 입력해 주세요.",
  },
  password: {
    validator: (x: string) =>
      RegExp(passwordPattern).test(x) ? null : passwordMessage,
    emptyMessage: passwordMessage,
  },
  confirmPassword: {
    validator: (pw: string, confirmPw: string) => pw === confirmPw ? null : "비밀번호가 일치하지 않습니다.",
    emptyMessage: "비밀번호를 다시 입력해주세요.",
  },
};
