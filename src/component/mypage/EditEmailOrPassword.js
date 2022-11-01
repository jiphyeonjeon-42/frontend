import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGetUsersSearch from "../../api/users/useGetUsersSearch";
import useDialog from "../../hook/useDialog";
import usePatchUsersMyupdate from "../../api/users/usePatchUsersMyupdate";
import Image from "../utils/Image";
import { registerRule } from "../../data/validate";
import arrowLeft from "../../img/arrow_left_black.svg";
import "../../css/EditEmailOrPassword.css";

const modeStringKorean = mode => (mode === "email" ? "이메일" : "비밀번호");
const modeString = mode => (mode === "email" ? "email" : "password");

function EditEmailOrPassword() {
  const { mode } = useParams();
  const navigate = useNavigate();
  const [revision, setRevision] = useState({
    text: "",
    check: "",
  });

  const {
    userList,
    Dialog: Error,
    setQueryNoDelay,
  } = useGetUsersSearch({ limit: 1 });

  useEffect(() => {
    const userId = JSON.parse(window.localStorage.getItem("user")).userName;
    setQueryNoDelay(userId);
  }, []);

  const userInfo = userList[0];

  const onChangeInput = e => {
    const { value } = e.currentTarget;
    setRevision({ ...revision, text: value });
  };

  const onChangeCheck = e => {
    const { value } = e.currentTarget;
    setRevision({ ...revision, check: value });
  };

  const { Dialog, setOpenTitleAndMessage } = useDialog();

  const { setPatchData } = usePatchUsersMyupdate({
    modeString: modeStringKorean(mode),
    setOpenTitleAndMessage,
  });

  const onSubmitUpdate = async e => {
    e.preventDefault();
    if (mode === "pw" && revision.text !== revision.check) {
      setOpenTitleAndMessage("비밀번호 재입력이 다릅니다.");
      return;
    }
    if (!registerRule[modeString(mode)]?.validator(revision.text)) {
      setOpenTitleAndMessage(registerRule[modeString(mode)].invalidMessage);
      return;
    }
    if (!revision.text) {
      setOpenTitleAndMessage(`${modeStringKorean(mode)}를 다시 확인해주세요`);
      return;
    }
    setPatchData({ [modeString(mode)]: revision.text });
  };

  return (
    <div className="mypage-edit">
      <Dialog />
      <Error />
      <div className="mypage-edit-box">
        <div className="mypage-edit-leftArrow">
          <button type="button" onClick={() => navigate(-1)}>
            <Image src={arrowLeft} alt={arrowLeft} />
          </button>
        </div>
        <div className="mypage-edit-title color-2d">
          <span>{`${userInfo ? userInfo.email : "-"}님의, `}</span>
          <span className="inline-block">{`${modeStringKorean(
            mode,
          )} 변경 페이지입니다`}</span>
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
                  value={revision.text}
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
                onChange={onChangeInput}
              />
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
                  onChange={onChangeCheck}
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
    </div>
  );
}

export default EditEmailOrPassword;
