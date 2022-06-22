import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import arrowLeft from "../../img/arrow_left_black.svg";
import "../../css/EditPassword.css";

function EditPassword() {
  const history = useHistory();
  const [newPw, setNewPw] = useState("");
  const [checkPw, setCheckPw] = useState("");

  const onChangeNewPw = e => {
    setNewPw(e.target.value);
  };

  const onChangeCheckPw = e => {
    setCheckPw(e.target.value);
  };

  const onSubmitUpdate = async e => {
    e.preventDefault();
    if (newPw !== checkPw) {
      // eslint-disable-next-line no-alert
      alert("비밀번호 재입력이 다릅니다.");
      return;
    }
    await axios.patch(`${process.env.REACT_APP_API}/users/myupdate`, {
      params: {
        password: newPw,
      },
    });
  };

  const onClickLeftArrow = () => {
    history.goBack();
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
          <span>{`${
            JSON.parse(window.localStorage.getItem("user")).userId
          }님의, 비밀번호 변경 페이지입니다`}</span>
        </div>
        <div className="mypage-edit-pw-new_pw">
          <span className="font-14-bold">새로운 비밀번호</span>
          <input
            placeholder="비밀번호 입력"
            type="password"
            // eslint-disable-next-line no-return-assign
            onFocus={e => (e.target.placeholder = "")}
            // eslint-disable-next-line no-return-assign
            onBlur={e => (e.target.placeholder = "비밀번호 입력")}
            onChange={onChangeNewPw}
          />{" "}
        </div>
        <form onSubmit={onSubmitUpdate}>
          <div className="mypage-edit-pw-check_pw">
            <span className="font-14-bold">비밀번호 재입력</span>
            <input
              placeholder="비밀번호 재입력"
              type="password"
              // eslint-disable-next-line no-return-assign
              onFocus={e => (e.target.placeholder = "")}
              // eslint-disable-next-line no-return-assign
              onBlur={e => (e.target.placeholder = "비밀번호 재입력")}
              onChange={onChangeCheckPw}
            />
          </div>
          <div className="mypage-edit-pw-button">
            <button className="font-14" type="button">
              변경
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPassword;
