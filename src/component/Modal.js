/* eslint-disable eqeqeq */
import React from "react";
import { atom, useRecoilState } from "recoil";
import CloseButton from "../img/x_button.svg";
import "../css/Modal.css";
import ModalBook from "./rent/ModalBook";
import ModalUser from "./rent/ModalUser";

export const isModalOpen = atom({ key: "isModalOpen", default: 0 });

// eslint-disable-next-line react/prop-types
const Modal = ({ setSelectUser }) => {
  const [userModal, setUserModal] = useRecoilState(isModalOpen);

  const closeModal = () => {
    setUserModal(0);
  };

  return (
    <div className="modal__background">
      <div className="modal__container">
        <button
          className="modal__close-button"
          type="button"
          onClick={closeModal}
        >
          <img src={CloseButton} alt="close" />
        </button>
        {userModal === 1 ? (
          <ModalUser
            setSelectUser={setSelectUser}
            setUserModal={setUserModal}
          />
        ) : (
          <ModalBook />
        )}
      </div>
    </div>
  );
};

export default Modal;
