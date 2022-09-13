import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import arrowLeft from "../../img/arrow_left_black.svg";
import "../../css/EditPassword.css";
import MiniModal from "../utils/MiniModal";
import ModalContentsOnlyTitle from "../utils/ModalContentsOnlyTitle";
import getErrorMessage from "../../data/error";

function EditPassword() {
  const navigate = useNavigate();
  const [isMiniModalOpen, setIsMiniModalOpen] = useState(false);
  const [miniModalContent, setMiniModalContent] = useState("");
  const [isGoBack, setIsGoBack] = useState(false);
  const [newPw, setNewPw] = useState("");
  const [checkPw, setCheckPw] = useState("");

  const onClickLeftArrow = () => {
    navigate(-1);
  };

  const onChangeNewPw = e => {
    setNewPw(e.target.value);
  };

  const onChangeCheckPw = e => {
    setCheckPw(e.target.value);
  };

  const onSubmitUpdate = async e => {
    e.preventDefault();
    if (newPw !== checkPw) {
      setMiniModalContent("비밀번호 재입력이 다릅니다.");
      setIsMiniModalOpen(true);
      return;
    }
    await axios
      .patch(`${process.env.REACT_APP_API}/users/myupdate`, {
        password: newPw,
      })
      .then(() => {
        setMiniModalContent("비밀번호 변경 성공");
        setIsMiniModalOpen(true);
        setIsGoBack(true);
      })
      .catch(err => {
        const { errorCode } = err.response.data;
        setMiniModalContent(getErrorMessage(errorCode));
        setIsMiniModalOpen(true);
      });
  };

  const closeModal = () => {
    setIsMiniModalOpen(false);
    if (isGoBack) navigate(-1);
  };

  return (
    <div className="mypage-edit-pw">
      <div className="mypage-edit-pwBox">
        <div className="mypage-edit-pw-leftArrow">
          <button type="button" onClick={onClickLeftArrow}>
            <img src={arrowLeft} alt={arrowLeft} />
          </button>
        </div>
        <div className="mypage-edit-pw-title">
          <p className="margin-bottom-2rem">
            <span className="font-22-bold">{`${
              JSON.parse(window.localStorage.getItem("user")).userId
            }님의, `}</span>
            <span className="font-22-bold inline-block">
              비밀번호 변경 페이지입니다
            </span>
          </p>
        </div>
        <div className="mypage-edit-pw-new_pw">
          <span className="font-14-bold">새로운 비밀번호</span>
          <input
            className="font-14"
            placeholder="비밀번호 입력"
            type="password"
            onFocus={e => {
              e.target.placeholder = "";
            }}
            onBlur={e => {
              e.target.placeholder = "비밀번호 입력";
            }}
            onChange={onChangeNewPw}
          />{" "}
        </div>
        <form onSubmit={onSubmitUpdate}>
          <div className="mypage-edit-pw-check_pw">
            <span className="font-14-bold">비밀번호 재입력</span>
            <input
              className="font-14"
              placeholder="비밀번호 재입력"
              type="password"
              onFocus={e => {
                e.target.placeholder = "";
              }}
              onBlur={e => {
                e.target.placeholder = "비밀번호 재입력";
              }}
              onChange={onChangeCheckPw}
            />
          </div>
          <div className="mypage-edit-pw-button">
            <p className="font-12 color-2d">
              10 ~ 42 글자 사이, 숫자와 특수 기호 1개 포함해주세요
            </p>
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

export default EditPassword;
