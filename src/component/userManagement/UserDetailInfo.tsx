import { useState, useRef, FormEventHandler } from "react";
import { usePatchUsersUpdate } from "../../api/users/usePatchUsersUpdate";
import InputWithLabel from "../utils/InputWithLabel";
import SelectWithLabel from "../utils/SelectWithLabel";
import Button from "../utils/Button";
import { dateFormat, dateLessThan, nowDate } from "../../util/date";
import { User } from "../../type";
import "../../asset/css/UserDetailInfo.css";

const roles = ["미인증", "카뎃", "사서", "운영진"];

type Props = {
  user: User;
};

const UserDetailInfo = ({ user }: Props) => {
  const [editMode, setEditMode] = useState(false);
  const [reset, setReset] = useState(false);
  const intraIdRef = useRef<HTMLInputElement>(null);
  const nickNameRef = useRef<HTMLInputElement>(null);
  const slackRef = useRef<HTMLInputElement>(null);
  const roleRef = useRef<HTMLSelectElement>(null);
  const penaltyRef = useRef<HTMLInputElement>(null);

  const exitEditMode = () => setEditMode(false);

  const { requestUpdate } = usePatchUsersUpdate({
    userId: user.id,
    exitEditMode,
  });

  const submitEdit: FormEventHandler = event => {
    event.preventDefault();
    const data = {
      nickname: nickNameRef.current?.value,
      intraId: intraIdRef.current?.value,
      slack: slackRef.current?.value,
      role: roleRef.current?.value,
      penaltyEndDate: dateFormat(penaltyRef.current?.value || ""),
    };
    requestUpdate(data);
  };

  return (
    <div className="user-detail-info">
      <div className="user-detail-info__title font-28-bold color-54">
        유저정보
      </div>
      <form className="user-detail-info__detail">
        <div className="user-detail-info__line" />
        <InputWithLabel labelText="ID" disabled inputInitialValue={user.id} />
        <InputWithLabel
          labelText="이메일"
          inputInitialValue={user.email}
          resetDependency={reset}
          disabled
        />
        <InputWithLabel
          labelText="인트라ID"
          inputInitialValue={user.intraId}
          resetDependency={reset}
          ref={intraIdRef}
          disabled={!editMode}
        />
        <InputWithLabel
          labelText="닉네임"
          inputInitialValue={user.nickname}
          resetDependency={reset}
          ref={nickNameRef}
          disabled={!editMode}
        />
        <InputWithLabel
          labelText="슬랙ID"
          inputInitialValue={user.slack}
          resetDependency={reset}
          ref={slackRef}
          disabled={!editMode}
        />
        <SelectWithLabel
          labelText="역할"
          optionList={roles}
          resetDependency={reset}
          disabled={!editMode}
          ref={roleRef}
          initialSelectedIndex={user.role}
        />
        <div className="user-detail-info__line" />
        <InputWithLabel
          labelText="확정 연체일"
          inputType="date"
          inputInitialValue={
            dateLessThan(user.penaltyEndDate, nowDate)
              ? "-"
              : user.penaltyEndDate
          }
          resetDependency={reset}
          ref={penaltyRef}
          disabled={!editMode}
        />
        <InputWithLabel
          labelText="추가 연체일"
          inputInitialValue={
            user.overDueDay === 0 ? "-" : `${user.overDueDay}일`
          }
          disabled
        />
        <div className="user-edit-button">
          {editMode && (
            <Button
              value="취소하기"
              onClick={e => {
                e.preventDefault();
                setReset(!reset);
                exitEditMode();
              }}
            />
          )}
          <Button
            value={editMode ? "저장하기" : "수정하기"}
            onClick={
              editMode
                ? submitEdit
                : e => {
                    e.preventDefault();
                    setEditMode(true);
                  }
            }
            color="red"
          />
        </div>
      </form>
    </div>
  );
};

export default UserDetailInfo;
