import React from "react";
import "../css/ModalUser.css";
import ModalSearchBar from "./ModalSearchBar";

const ModalUser = () => {
  return (
    <div className="modal-user__search-bar">
      <div className="modal-user__text font-28-bold color-54">카뎃 정보</div>
      <ModalSearchBar
        width="long"
        placeHolder="대출자의 성명을 입력해주세요."
      />
    </div>
  );
};

export default ModalUser;
