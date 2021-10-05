import React, { useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import userState from "../../atom/userState";

const Auth = () => {
  const setUser = useSetRecoilState(userState);
  useEffect(async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_API}/auth/me`);
    setUser({
      isLogin: true,
      id: data.id,
      userId: data.intra,
      isAdmin: data.librarian,
      imgUrl: data.imageUrl,
    });
  }, []);
  return (
    <div>
      <Redirect to="/" />;
    </div>
  );
};

export default Auth;
