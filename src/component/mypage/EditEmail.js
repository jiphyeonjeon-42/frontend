import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import arrowLeft from "../../img/arrow_left_black.svg";
import "../../css/EditEmail.css";
import MiniModal from "../utils/MiniModal";
import ModalContentsOnlyTitle from "../utils/ModalContentsOnlyTitle";
import getErrorMessage from "../../data/error";

function EditEmail() {
  const history = useHistory();
  const [isMiniModalOpen, setIsMiniModalOpen] = useState(false);
  const [miniModalContent, setMiniModalContent] = useState("");
  const [isGoBack, setIsGoBack] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [newEmail, setNewEmail] = useState("");

  const onClickLeftArrow = () => {
    history.goBack();
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
      .then(() => {
        setMiniModalContent("이메일 변경 성공");
        setIsMiniModalOpen(true);
        setIsGoBack(true);
      })
      .catch(err => {
        const errorCode = err.response.data.errCode;
        setMiniModalContent(getErrorMessage(errorCode));
        setIsMiniModalOpen(true);
      });
  };

  const closeModal = () => {
    setIsMiniModalOpen(false);
    if (isGoBack) history.goBack();
  };

  useEffect(async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/users/search`, {
        params: {
          nicknameOrEmail: JSON.parse(window.localStorage.getItem("user"))
            .userId,
        },
      })
      .then(res => setUserInfo(res.data.items[0]))
      .catch(err => {
        const errorCode = err.response.data.errCode;
        setMiniModalContent(getErrorMessage(errorCode));
        setIsMiniModalOpen(true);
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
          <span>{`${
            JSON.parse(window.localStorage.getItem("user")).userId
          }님의, 이메일 변경 페이지입니다`}</span>
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
      {isMiniModalOpen ? (
        <MiniModal closeModal={closeModal}>
          <ModalContentsOnlyTitle
            title={miniModalContent}
            closeModal={closeModal}
          />
        </MiniModal>
      ) : null}
    </div>
  );
}

export default EditEmail;
