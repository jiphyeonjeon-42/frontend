import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import usePatchUsersUpdate from "../../api/users/usePatchUsersUpdate";
import InputWithLabel from "../utils/InputWithLabel";
import SelectWithLabel from "../utils/SelectWithLabel";
import Button from "../utils/Button";
import { dateFormat, dateLessThan, nowDate } from "../../util/date";
import "../../css/UserDetailInfo.css";

const roles = ["미인증", "카뎃", "사서", "운영진"];

const UserDetailInfo = ({ user }) => {
  const [editMode, setEditMode] = useState(false);
  const intraIdRef = useRef(null);
  const nickNameRef = useRef(null);
  const slackRef = useRef(null);
  const roleRef = useRef(null);
  const penaltyRef = useRef(null);

  const toggelEditMode = () => {
    setEditMode(!editMode);
  };

  const { requestUpdate, Dialog } = usePatchUsersUpdate({
    userId: user.id,
    setEditMode,
  });

  const submitEdit = event => {
    event.preventDefault();
    const data = {
      nickname: nickNameRef.current?.value,
      intraId: intraIdRef.current?.value,
      slack: slackRef.current?.value,
      role: roleRef.current?.value,
      penaltyEndDate: dateFormat(penaltyRef.current?.value),
    };
    requestUpdate(data);
  };

  return (
    <div className="user-detail-info">
      <Dialog />
      <div className="user-detail-info__title font-28-bold color-54">
        유저정보
      </div>
      <form className="user-detail-info__detail">
        <div className="user-detail-info__line" />
        <InputWithLabel labelText="ID" disabled inputInitialValue={user.id} />
        <InputWithLabel
          labelText="이메일"
          inputInitialValue={user.email}
          disabled
        />
        <InputWithLabel
          labelText="인트라ID"
          inputInitialValue={user.intraId}
          ref={intraIdRef}
          disabled={!editMode}
        />
        <InputWithLabel
          labelText="닉네임"
          inputInitialValue={user.nickname}
          ref={nickNameRef}
          disabled={!editMode}
        />
        <InputWithLabel
          labelText="슬랙ID"
          inputInitialValue={user.slack}
          ref={slackRef}
          disabled={!editMode}
        />
        <SelectWithLabel
          labelText="역할"
          optionList={roles}
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
          {editMode && <Button value="취소하기" onClick={toggelEditMode} />}
          <Button
            value={editMode ? "저장하기" : "수정하기"}
            onClick={editMode ? submitEdit : toggelEditMode}
            color="red"
          />
        </div>
      </form>
    </div>
  );
};

export default UserDetailInfo;

UserDetailInfo.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    nickname: PropTypes.string,
    intraId: PropTypes.number,
    slack: PropTypes.string,
    penaltyEndDate: PropTypes.string,
    overDueDay: PropTypes.string,
    role: PropTypes.number,
    reservations: PropTypes.arrayOf(
      PropTypes.shape({
        ranking: PropTypes.number,
        endAt: PropTypes.Date,
        lenderableDate: PropTypes.Date,
        title: PropTypes.string,
      }),
    ),
  }).isRequired,
};
