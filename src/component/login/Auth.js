import React, { useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import userState from "../../atom/userState";
import globalModal from "../../atom/globalModal";

const Auth = () => {
  const setUser = useSetRecoilState(userState);
  const setGlobalModal = useSetRecoilState(globalModal);
  useEffect(async () => {
    const result = await axios.get(`${process.env.REACT_APP_API}/auth/me`);
    if (result.status === 200) {
      const { data } = result;
      setUser({
        isLogin: true,
        id: data.id,
        userId: data.intra,
        isAdmin: data.librarian,
        imgUrl: data.imageUrl,
      });
      window.history.go(-2);
    } else {
      setGlobalModal({
        view: true,
        error: `me ${result.status} ${result.statusText}`,
      });
    }
  }, []);
  return (
    <div>
      <Redirect to="/" />
    </div>
  );
};
export default Auth;
