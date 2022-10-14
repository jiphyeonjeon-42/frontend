/* eslint-disable no-nested-ternary */
import React from "react";
import PropTypes from "prop-types";
import Arrow from "../../img/arrow_right_black.svg";
import "../../css/RentModalUserList.css";

const UserList = ({ user, setSelectedUser, closeModal }) => {
  const seletUser = () => {
    setSelectedUser(user);
    closeModal();
  };

  const displayPenalty = () => {
    let penalty = "";
    if (
      new Date(user.penaltyEndDate).setHours(0, 0, 0, 0) >=
        new Date().setHours(0, 0, 0, 0) ||
      user.overDueDay > 0
    )
      penalty += "대출 불가 (연체";
    if (user.lendings.length >= 2) {
      if (penalty !== "") penalty += ", 2권 이상 대출";
      else penalty += "대출 불가 (2권 이상 대출";
    }
    if (penalty !== "") penalty += ")";
    return penalty;
  };

  return (
    <button
      className={`rent__user-list ${
        displayPenalty() === "" ? "color-54" : "disabled color-a4"
      }`}
      type="button"
      onClick={seletUser}
      disabled={displayPenalty() === "" ? "" : "disabled"}
    >
      <div className="rent__user-list__name">
        <div className="font-18-bold rent__text-ellipsis">
          {user.nickname ? user.nickname : user.email}
        </div>
      </div>
      <div
        className={`rent__user-list__penalty ${
          displayPenalty() === "" ? "available" : "disabled"
        } font-16`}
      >
        {displayPenalty() === ""
          ? `대출 중인 도서 : ${user.lendings.length}권`
          : displayPenalty()}
      </div>
      <img className="rent__user-list__arrow" src={Arrow} alt="arrow" />
    </button>
  );
};

export default UserList;

UserList.propTypes = {
  setSelectedUser: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object.isRequired,
};
