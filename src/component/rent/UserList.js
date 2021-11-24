/* eslint-disable no-nested-ternary */
import React from "react";
import PropTypes from "prop-types";
import Arrow from "../../img/arrow_right_black.svg";
import "../../css/UserList.css";

const UserList = ({ user, setSelectUser, setUserModal }) => {
  const seletUser = () => {
    if (setSelectUser) {
      setSelectUser(user);
    }
    if (setUserModal) {
      setUserModal(0);
    }
  };

  return (
    <button
      className="user-list"
      type="button"
      onClick={seletUser}
      //   disabled={user.isPenalty || user.lendingCnt >= 2 ? "disabled" : ""}
    >
      <div className="user-list__name">
        <div className="font-18-bold color-54">{user.login}</div>
      </div>
      <div className="user-list__lent-cnt font-16 color-54">
        대출중인 도서 : {user.lendingCnt}권
      </div>
      <div className="user-list__penalty font-16 color-red">
        {user.isPenalty
          ? "대출제한(연체)"
          : user.lendingCnt >= 2
          ? "대출제한(2권 이상 대출)"
          : null}
      </div>
      <img className="user-list__arrow" src={Arrow} alt="arrow" />
    </button>
  );
};

export default UserList;

UserList.propTypes = {
  setSelectUser: PropTypes.func.isRequired,
  setUserModal: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object.isRequired,
};
