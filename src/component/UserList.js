/* eslint-disable no-nested-ternary */
import React from "react";
import Arrow from "../img/arrow_right_black.svg";
import "../css/UserList.css";

// eslint-disable-next-line react/prop-types
const UserList = ({ name, lendCnt, isPenalty }) => {
  return (
    <div className="user-list">
      <div className="user-list__name font-18-bold color-54">{name}</div>
      <div className="user-list__lent-cnt font-16 color-54">
        대출중인 도서 : {lendCnt}권
      </div>
      <div className="font-16 color-red">
        {isPenalty
          ? "대출제한(연체)"
          : lendCnt >= 2
          ? "대출제한(2권 이상 대출)"
          : null}
      </div>
      <img className="user-list__arrow" src={Arrow} alt="arrow" />
    </div>
  );
};

export default UserList;
