import axios from "axios";
import React from "react";
import { Navigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import userState from "../../atom/userState";

const Logout = () => {
  const setUser = useSetRecoilState(userState);
  const defaultUser = {
    isLogin: false,
    id: 0,
    userId: "",
    isAdmin: false,
    imgUrl: "",
  };
  setUser(defaultUser);
  window.localStorage.setItem("user", JSON.stringify(defaultUser));
  axios.post(`${process.env.REACT_APP_API}/auth/logout`);
  return (
    <div>
      <Navigate to="/" />
    </div>
  );
};

export default Logout;
