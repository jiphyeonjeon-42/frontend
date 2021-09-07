import React, { useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import userState from "../atom/userState";

const Auth = () => {
  const setUser = useSetRecoilState(userState);
  useEffect(async () => {
    const user = axios.get(`${process.env.REACT_APP_API}/auth/me`);
    console.log(user);
    setUser(user);
  }, []);
  return (
    <div>
      <Redirect to="/" />;
    </div>
  );
};

export default Auth;
