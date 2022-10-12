import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecoilState } from "recoil";
import arrowLeft from "../../img/arrow_left_black.svg";
import getErrorMessage from "../../data/error";
import useDialog from "../../hook/useDialog";
import userState from "../../atom/userState";
import "../../css/EditEmail.css";

function EditEmail() {
  const navigate = useNavigate();
  const [openDialog, , dialogConfig, setDialogConfig, Dialog] = useDialog();
  const [user, setUser] = useRecoilState(userState);
  const [userInfo, setUserInfo] = useState(null);
  const [newEmail, setNewEmail] = useState("");

  const onClickLeftArrow = () => {
    navigate(-1);
  };

  const onChangeInput = e => {
    setNewEmail(e.target.value);
  };

  const onSubmitUpdate = async e => {
    e.preventDefault();
    await axios
      .patch(`${process.env.REACT_APP_API}/users/myupdate`, {
        email: newEmail,
      })
      ?.then(() => {
        const newUser = { ...user, userId: newEmail };
        setUser(newUser);
        window.localStorage.setItem("user", JSON.stringify(newUser));
        setDialogConfig({
          title: "이메일 변경 성공",
          message: "",
          afterCloseFunction: () => navigate(-1),
        });
        openDialog();
      })
      ?.catch(error => {
        const errorCode = parseInt(error?.response?.data?.errorCode, 10);
        const [title, message] = getErrorMessage(errorCode).split("\r\n");
        setDialogConfig({ ...dialogConfig, title, message });
        openDialog();
      });
  };

  useEffect(async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/users/search`, {
        params: {
          nicknameOrEmail: user.userId,
        },
      })
      ?.then(res => setUserInfo(res.data.items[0]))
      ?.catch(error => {
        const errorCode = parseInt(error?.response?.data?.errorCode, 10);
        const [title, message] = getErrorMessage(errorCode).split("\r\n");
        setDialogConfig({ ...dialogConfig, title, message });
        openDialog();
      });
  }, []);

  return (
    <div className="mypage-edit-email">
      <div className="mypage-edit-emailBox">
        <div className="mypage-edit-email-leftArrow">
          <button type="button" onClick={onClickLeftArrow}>
            <img src={arrowLeft} alt={arrowLeft} />
          </button>
        </div>
        <div className="mypage-edit-email-title color-2d">
          <span>{`${user.userId}님의, 이메일 변경 페이지입니다`}</span>
        </div>
        <div className="mypage-edit-email-curr_email">
          <span className="font-14-bold color-2d">현재 이메일</span>
          <span className="font-14 text-center">
            {userInfo ? userInfo.email : "-"}
          </span>
        </div>
        <form onSubmit={onSubmitUpdate}>
          <div className="mypage-edit-email-new_email font-14">
            <span className="font-14-bold color-2d">새로운 이메일</span>
            <input
              value={newEmail}
              type="email"
              onChange={onChangeInput}
              placeholder="이메일을 입력해주세요"
              onFocus={e => {
                e.target.placeholder = "";
              }}
              onBlur={e => {
                e.target.placeholder = "이메일을 입력해주세요";
              }}
            />
          </div>
          <div className="mypage-edit-email-button">
            <button className="font-14" type="submit">
              변경
            </button>
          </div>
        </form>
      </div>
      <Dialog />
    </div>
  );
}

export default EditEmail;
