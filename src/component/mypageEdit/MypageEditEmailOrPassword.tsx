import { ChangeEvent, FormEventHandler, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePatchUsersMyupdate } from "../../api/users/usePatchUsersMyupdate.js";
import { useNewDialog } from "../../hook/useNewDialog.js";
import { registerRule } from "../../constant/validate.js";
import Image from "../utils/Image.js";
import arrowLeft from "../../asset/img/arrow_left_black.svg";
import "../../asset/css/EditEmailOrPassword.css";

function EditEmailOrPassword() {
  const isEmailMode = useParams().mode === "email";
  const mode = isEmailMode ? "email" : "password";
  const modeKorean = isEmailMode ? "이메일" : "비밀번호";

  const navigate = useNavigate();
  const [revision, setRevision] = useState({
    text: "",
    check: "",
  });

  const user = window.localStorage.getItem("user");
  const userInfo = useMemo(() => user && JSON.parse(user), []);

  const onChangeInput = (
    e: ChangeEvent<HTMLInputElement>,
    input: "text" | "check",
  ) => {
    const { value } = e.currentTarget;
    setRevision(prev => {
      return { ...prev, [input]: value };
    });
  };

  const { setPatchData } = usePatchUsersMyupdate({ modeKorean });

  const { addDialogWithTitleAndMessage } = useNewDialog();

  const onSubmitUpdate: FormEventHandler = async e => {
    e.preventDefault();
    if (!registerRule[mode]?.validator(revision.text, revision.check)) {
      addDialogWithTitleAndMessage(
        "editMypageError",
        registerRule[mode].invalidMessage,
        "",
      );
      return;
    }
    if (!revision.text) {
      addDialogWithTitleAndMessage(
        "editMypageError",
        `${modeKorean}를 다시 확인해주세요`,
        "",
      );
      return;
    }
    setPatchData({ [mode]: revision.text });
  };

  return (
    <div className="mypage-edit">
      <div className="mypage-edit-box">
        <div className="mypage-edit-leftArrow">
          <button type="button" onClick={() => navigate(-1)}>
            <Image src={arrowLeft} alt={arrowLeft} />
          </button>
        </div>
        <div className="mypage-edit-title color-2d">
          <span>{`${userInfo ? userInfo.email : "-"}님의, `}</span>
          <span className="inline-block">{`${modeKorean} 변경 페이지입니다`}</span>
        </div>
        {isEmailMode ? (
          <>
            <div className="mypage-edit-email-curr_email">
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
                  onChange={e => onChangeInput(e, "text")}
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
        {!isEmailMode ? (
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
                onChange={e => onChangeInput(e, "text")}
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
                  onChange={e => onChangeInput(e, "check")}
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
