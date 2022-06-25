/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import "../../css/UserBriefInfo.css";
import UserUsage from "../../img/book-arrow-right.svg";
import UserEdit from "../../img/edit.svg";

const roles = ["미인증", "일반", "사서", "스태프"];
const USAGE = 1;
const EDIT = 2;

const UserBriefInfo = ({ user, line, setModal, setSelectedUser }) => {
  const openUsageModal = () => {
    setSelectedUser(user);
    setModal(USAGE);
  };
  const openEditModal = () => {
    setSelectedUser(user);
    setModal(EDIT);
  };

  // eslint-disable-next-line no-unused-vars
  const getOverDueDate = overDueDay => {
    const today = new Date();
    let overDueDate = "";

    today.setDate(today.getDate() + overDueDay);
    overDueDate += today.getFullYear();
    overDueDate += "-";
    overDueDate += today.getMonth() + 1;
    overDueDate += "-";
    overDueDate += today.getDate();
    return overDueDate.substring(2);
  };

  return (
    <div className={`user-info ${line ? "user-info-line" : ""}`}>
      <div className="user-info__id font-18-bold color-54">{user.id}</div>
      <div className="user-info__nickname font-18-bold color-54">
        {user.nickname ? user.nickname : "-"}
      </div>
      {user.role ? (
        <div className="user-info__role font-18 color-54">
          {roles[user.role]}
        </div>
      ) : (
        <div className="user-info__role font-18 color-red">
          {roles[user.role]}
        </div>
      )}
      <div className="user-info__email font-18-bold color-54">{user.email}</div>
      <div className="user-info__overdue font-18 color-54">
        {user.overDueDay ? getOverDueDate(user.overDueDay) : "-"}
      </div>
      {user.nickname ? (
        <button
          className="user-info__button"
          type="button"
          onClick={openUsageModal}
        >
          <img className="user-info__button-img" src={UserUsage} alt="" />
        </button>
      ) : (
        <div className="user-info__usage font-18 color-54">-</div>
      )}
      {user.nickname ? (
        <button
          className="user-info__button"
          type="button"
          onClick={openEditModal}
        >
          <img className="user-info__button-img" src={UserEdit} alt="" />
        </button>
      ) : (
        <div className="user-info__edit font-18 color-54">-</div>
      )}
    </div>
  );
};

export default UserBriefInfo;

UserBriefInfo.propTypes = {
  line: PropTypes.bool.isRequired,
  setModal: PropTypes.func.isRequired,
  setSelectedUser: PropTypes.func.isRequired,
};