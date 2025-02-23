import { useSetAtom } from "jotai";
import { useApi } from "~/hook/useApi";
import { addHourDateObject } from "~/util/date";
import { userAtom } from "~/atom/userAtom";
import getErrorMessage from "~/constant/error";
import { UserState } from "~/type";

export const useGetAuthMe = () => {
  const { request } = useApi("get", "auth/me");
  const setUser = useSetAtom(userAtom);

  const onSuccess = (response: any) => {
    const { data } = response;
    const newUser: UserState = {
      isLogin: true,
      id: data.id,
      userName: data.intra,
      email: data.email,
      isAdmin: data.librarian,
      expire: addHourDateObject(new Date(), 8).toISOString(),
    };
    setUser(newUser);
  };

  const onError = (error: any) => {
    const errorCode = parseInt(error?.response?.data?.errorCode, 10);
    const [title, message] = getErrorMessage(errorCode).split("\r\n");
    window.localStorage.setItem(
      "error",
      JSON.stringify({ title, message: errorCode ? message : error.message }),
    );
  };
  return () => request(onSuccess, onError);
};
