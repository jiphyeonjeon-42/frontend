import axios from "axios";
import React from "react";
import { Redirect } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import userState from "../atom/userState";

const Logout = () => {
  const setUser = useSetRecoilState(userState);
  setUser({
    id: 0,
    userId: "",
    isAdmin: false,
    imgUrl: "",
  });
  axios.post(`${process.env.REACT_APP_API}/auth/logout`);
  return (
    <div>
      <Redirect to="/" />
    </div>
  );
};

export default Logout;
