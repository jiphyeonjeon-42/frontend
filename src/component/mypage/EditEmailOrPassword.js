import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import arrowLeft from "../../img/arrow_left_black.svg";
import "../../css/EditEmailOrPassword.css";
import MiniModal from "../utils/MiniModal";
import ModalContentsOnlyTitle from "../utils/ModalContentsOnlyTitle";
import getErrorMessage from "../../data/error";

function EditEmailOrPassword() {
  const { mode } = useParams();
  const navigate = useNavigate();
  const [isMiniModalOpen, setIsMiniModalOpen] = useState(false);
  const [miniModalContent, setMiniModalContent] = useState("");
  const [isGoBack, setIsGoBack] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [newEmail, setNewEmail] = useState("");
  const [newPw, setNewPw] = useState("");
  const [checkPw, setCheckPw] = useState("");
  const MODE_TO_KOREAN = mode === "email" ? "이메일" : "비밀번호";

  const onClickLeftArrow = () => {
    navigate(-1);
  };

  const onChangeInput = e => {
    setNewEmail(e.target.value);
  };

  const onChangeNewPw = e => {
    setNewPw(e.target.value);
  };

  const onChangeCheckPw = e => {
    setCheckPw(e.target.value);
  };

  const onSubmitUpdate = async e => {
    e.preventDefault();
    if (mode === "pw" && newPw !== checkPw) {
      setMiniModalContent("비밀번호 재입력이 다릅니다.");
      setIsMiniModalOpen(true);
      return;
    }
    await axios
      .patch(
        `${process.env.REACT_APP_API}/users/myupdate`,
        mode === "email"
          ? {
              email: newEmail,
            }
          : {
              password: newPw,
            },
      )
      .then(() => {
        if (mode === "email") setMiniModalContent("이메일 변경 성공");
        else setMiniModalContent("비밀번호 변경 성공");
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

  useEffect(async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/users/search`, {
        params: {
          id: JSON.parse(window.localStorage.getItem("user")).id,
        },
      })
      .then(res => setUserInfo(res.data.items[0]))
      .catch(err => {
        const { errorCode } = err.response.data;
        setMiniModalContent(getErrorMessage(errorCode));
        setIsMiniModalOpen(true);
      });
  }, []);

  return (
    <div className="mypage-edit">
      <div className="mypage-edit-box">
        <div className="mypage-edit-leftArrow">
          <button type="button" onClick={onClickLeftArrow}>
            <img src={arrowLeft} alt={arrowLeft} />
          </button>
        </div>
        <div className="mypage-edit-title color-2d">
          <span>{`${userInfo ? userInfo.email : "-"}님의, `}</span>
          <span className="inline-block">{`${MODE_TO_KOREAN} 변경 페이지입니다`}</span>
        </div>
        {mode === "email" ? (
          <>
            <div className={`mypage-edit-${mode}-curr_email`}>
              <span className="font-14-bold color-2d">현재 이메일</span>
              <span className="font-14 text-center">
                {userInfo ? userInfo.email : "-"}
              </span>
            </div>
            <form onSubmit={onSubmitUpdate}>
              <div className="mypage-edit-input-box font-14">
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
              <div className={`mypage-edit-${mode}-button`}>
                <button className="font-14" type="submit">
                  변경
                </button>
              </div>
            </form>
          </>
        ) : null}
        {mode === "pw" ? (
          <>
            <div className="mypage-edit-input-box font-14">
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
              <div className="mypage-edit-input-box font-14">
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
              <div className={`mypage-edit-${mode}-button`}>
                <p className="font-12 color-2d">
                  10 ~ 42 글자 사이, 숫자와 특수 기호 1개 포함해주세요
                </p>
                <button className="font-14" type="submit">
                  변경
                </button>
              </div>
            </form>
          </>
        ) : null}
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

export default EditEmailOrPassword;
