import { useSetRecoilState } from "recoil";
import { useApi } from "../../hook/useApi";
import { addHourDateObject } from "../../util/date";
import userState from "../../atom/userState";
import getErrorMessage from "../../constant/error";

export const useGetAuthMe = () => {
  const { request } = useApi("get", "auth/me");
  const setUser = useSetRecoilState(userState);

  const onSuccess = (response: any) => {
    const { data } = response;
    const newUser = {
      isLogin: true,
      id: data.id,
      userName: data.intra,
      email: data.email,
      isAdmin: data.librarian,
      expire: addHourDateObject(new Date(), 8).toISOString(),
    };
    setUser(newUser);
    window.localStorage.setItem("user", JSON.stringify(newUser));
  };

  const onError = (error: any) => {
    const errorCode = error?.response?.data?.errorCode;
    const [title, message] = getErrorMessage(errorCode).split("\r\n");
    window.localStorage.setItem(
      "error",
      JSON.stringify({ title, message: errorCode ? message : error.message }),
    );
  };
  return () => request(onSuccess, onError);
};
