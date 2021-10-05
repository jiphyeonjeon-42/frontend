/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import { useSetRecoilState } from "recoil";
import { isModalOpen } from "../Modal";
import DeleteButton from "../../img/x_button.svg";
import "../../css/InquireBoxUser.css";

const USER_MODAL = 1;

const InquireBoxUser = ({ selectUser, setSelectUser }) => {
  const setUserModal = useSetRecoilState(isModalOpen);

  const openModal = () => {
    setUserModal(USER_MODAL);
  };

  const deleteUser = () => {
    if (setSelectUser) {
      setSelectUser(null);
    }
  };

  return (
    <div className="inquire-box-user">
      {selectUser ? (
        <div className="inquire-box-user__id-undo">
          <div className="inquire-box-user__id font-28-bold color-54">
            {selectUser.id}
          </div>
          <button
            className="inquire-box-user__undo-button color-a4"
            type="button"
            onClick={deleteUser}
          >
            <img src={DeleteButton} alt="delete" />
          </button>
        </div>
      ) : (
        <button
          className="inquire-box-user__add-button color-a4"
          type="button"
          onClick={openModal}
        >
          +
        </button>
      )}
    </div>
  );
};

export default InquireBoxUser;

InquireBoxUser.propTypes = {
  setSelectUser: PropTypes.func.isRequired,
};
