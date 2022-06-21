/* eslint-disable react/prop-types */
import React, { useState } from "react";
import axios from "axios";
// import PropTypes from "prop-types";
import "../../css/UserBriefInfo.css";
import "../../css/UserDetailInfo.css";

const roles = ["미인증", "일반", "사서", "스태프"];

const getOverDueDate = overDueDay => {
  const today = new Date();
  let overDueDate = "";

  today.setDate(today.getDate() + overDueDay);
  overDueDate += today.getFullYear();
  overDueDate += "-";
  overDueDate += today.getMonth() + 1;
  overDueDate += "-";
  overDueDate += today.getDate();
  return overDueDate;
};

const UserInfoEdit = ({ infoKey, infoId, infoValue }) => {
  const [input, setInput] = useState(infoValue);

  const onChange = event => {
    const {
      target: { value },
    } = event;
    setInput(value);
  };

  return (
    <div className="user-detail-info__edit color-54">
      <div className="user-detail-info__key font-18-bold">{infoKey}</div>
      <input
        className={`user-detail-info__edit-input edit-${infoId}`}
        type="text"
        autoComplete="off"
        value={input}
        onChange={onChange}
      />
    </div>
  );
};

const UserRoleEdit = ({ userRole, roleList }) => {
  return (
    <div className="user-detail-info__edit color-54">
      <div className="user-detail-info__key font-18-bold">ROLE</div>
      <select className="user-detail-info__edit-select edit-role">
        {roleList.map((role, index) => {
          if (index === userRole)
            return (
              <option value={index} selected>
                {role}
              </option>
            );
          return <option value={index}>{role}</option>;
        })}
      </select>
    </div>
  );
};

const UserInfoDisplay = ({ infoKey, infoValue }) => {
  return (
    <div className="user-detail-info__display color-54">
      <div className="user-detail-info__key font-18-bold">{infoKey}</div>
      <div className="user-detail-info__value font-18">{infoValue}</div>
    </div>
  );
};

const UserDetailInfo = ({ user }) => {
  const [editMode, setEditMode] = useState(false);

  const onEditMode = () => {
    setEditMode(true);
  };

  const offEditMode = () => {
    setEditMode(false);
  };

  const patchUserInfo = async data => {
    await axios
      .patch(`${process.env.REACT_APP_API}/users/update/${user.id}`, data)
      .then(res => {
        console.log(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const submitEdit = event => {
    event.preventDefault();
    const userEditForm = document.getElementById("edit-form");
    const intra = userEditForm.querySelector(".edit-intra-id").value;
    const nickname = userEditForm.querySelector(".edit-nickname").value;
    const role = userEditForm.querySelector(".edit-role").value;
    const slack = userEditForm.querySelector(".edit-slack").value;
    console.log(intra, nickname, slack, role);
    const data = {
      nickname,
      intraId: parseInt(intra, 10),
      slack,
      role: parseInt(role, 10),
    };
    patchUserInfo(data);
    offEditMode();
  };

  return (
    <div className="user-detail-info">
      <div className="user-detail-info__title font-28-bold color-54">
        유저정보
      </div>
      {editMode ? (
        <form id="edit-form">
          <UserInfoDisplay infoKey="ID" infoValue={user.id} />
          <UserInfoDisplay infoKey="EMAIL" infoValue={user.email} />
          <UserInfoEdit
            infoKey="INTRA ID"
            infoId="intra-id"
            infoValue={user.intraId}
          />
          <UserInfoEdit
            infoKey="NICKNAME"
            infoId="nickname"
            infoValue={user.nickname}
          />
          <UserInfoEdit infoKey="SLACK" infoId="slack" infoValue={user.slack} />
          <UserRoleEdit userRole={user.role} roleList={roles} />
          <div className="user-detail-info__line" />
          <UserInfoDisplay
            infoKey="대출 불가 기간"
            infoValue={user.overDueDay ? getOverDueDate(user.overDueDay) : "-"}
          />
          <UserInfoDisplay
            infoKey="연체일"
            infoValue={user.overDueDay === 0 ? "-" : `${user.overDueDay}일`}
          />
          <div className="user-edit-button">
            <button
              className="user-edit-off-button"
              type="button"
              onClick={offEditMode}
            >
              <div className="user-edit-on-button__text font-20-bold color-ff">
                취소
              </div>
            </button>
            <button
              className="user-edit-submit-button"
              type="button"
              onClick={submitEdit}
            >
              <div className="user-edit-on-button__text font-20-bold color-ff">
                저장
              </div>
            </button>
          </div>
        </form>
      ) : (
        <>
          <UserInfoDisplay infoKey="ID" infoValue={user.id} />
          <UserInfoDisplay infoKey="EMAIL" infoValue={user.email} />
          <UserInfoDisplay infoKey="INTRA ID" infoValue={user.intraId} />
          <UserInfoDisplay infoKey="NICKNAME" infoValue={user.nickname} />
          <UserInfoDisplay infoKey="SLACK" infoValue={user.slack} />
          <UserInfoDisplay infoKey="ROLE" infoValue={roles[user.role]} />
          <div className="user-detail-info__line" />
          <UserInfoDisplay
            infoKey="대출 불가 기간"
            infoValue={user.overDueDay ? getOverDueDate(user.overDueDay) : "-"}
          />
          <UserInfoDisplay
            infoKey="연체일"
            infoValue={user.overDueDay === 0 ? "-" : `${user.overDueDay}일`}
          />
          <div className="user-edit-button">
            <button
              className="user-edit-on-button"
              type="button"
              onClick={onEditMode}
            >
              <div className="user-edit-on-button__text font-20-bold color-ff">
                수정
              </div>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserDetailInfo;
