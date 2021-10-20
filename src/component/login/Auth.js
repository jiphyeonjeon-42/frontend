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
    await axios
      .get(`${process.env.REACT_APP_API}/auth/me`)
      .then(response => {
        const { data } = response;
        const newUser = {
          isLogin: true,
          id: data.id,
          userId: data.intra,
          isAdmin: data.librarian,
          imgUrl: data.imageUrl,
        };
        setUser(newUser);
        window.localStorage.setItem("user", JSON.stringify(newUser));
        window.history.go(-2);
      })
      .catch(response => {
        setGlobalModal({
          view: true,
          error: `me ${response.name} ${response.message}`,
        });
      });
  }, []);
  return (
    <div>
      <Redirect to="/" />
    </div>
  );
};
export default Auth;
