/* eslint-disable eqeqeq */
import React from "react";
import { atom, useRecoilState } from "recoil";
import CloseButton from "../img/x_button.svg";
import "../css/Modal.css";
import ModalBook from "./ModalBook";
import ModalUser from "./ModalUser";

export const isModalOpen = atom({ key: "isModalOpen", default: 0 });

const Modal = () => {
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
        {userModal === 1 ? <ModalUser /> : <ModalBook />}
      </div>
    </div>
  );
};

export default Modal;
