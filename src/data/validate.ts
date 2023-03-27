export const passwordPattern =
  "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$&+,:;=?@#|'<>.^*()%!-])[A-Za-z\\d$&+,:;=?@#|'<>.^*()%!-]{10,42}$";
export const emailPattern = "^\\w+([.-]?\\w+)*@\\w+([.-]?\\w+)*(.\\w{2,3})+$";

export const registerRule = {
  email: {
    validator: (x: string) => RegExp(emailPattern).test(x),
    invalidMessage: "이메일 형식이 아닙니다.",
    emptyMessage: "이메일을 입력해 주세요.",
  },
  password: {
    validator: (x: string) => RegExp(passwordPattern).test(x),
    invalidMessage: "10~42자 영문 대 소문자, 숫자, 특수문자를 사용하세요.",
    emptyMessage: "10~42자 영문 대 소문자, 숫자, 특수문자를 사용하세요.",
  },
  confirmPassword: {
    validator: (pw: string, confirmPw: string) => pw === confirmPw,
    invalidMessage: "비밀번호가 일치하지 않습니다.",
    emptyMessage: "비밀번호를 재입력 해주세요.",
  },
}
