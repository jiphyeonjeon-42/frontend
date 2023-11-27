import { useEffect, useState } from "react";
import { useApi } from "../../hook/useApi";
import { User } from "../../type";

export const useGetUsersMe = () => {
  const [userInfo, setUserInfo] = useState<User>();

  const { request } = useApi("get", "users/me");

  const refineResponse = (response: any) => {
    const user = response.data;
    setUserInfo(user);
  };

  useEffect(() => request(refineResponse), []);

  return { userInfo };
};
