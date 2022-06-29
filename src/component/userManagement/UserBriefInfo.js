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
      <button
        className="user-info__button"
        type="button"
        onClick={openEditModal}
      >
        <img className="user-info__button-img" src={UserEdit} alt="" />
      </button>
    </div>
  );
};

export default UserBriefInfo;

UserBriefInfo.propTypes = {
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
    lendings: PropTypes.arrayOf(
      PropTypes.shape({ dueDate: PropTypes.string, title: PropTypes.string }),
    ),
  }).isRequired,
  line: PropTypes.bool.isRequired,
  setModal: PropTypes.func.isRequired,
  setSelectedUser: PropTypes.func.isRequired,
};
