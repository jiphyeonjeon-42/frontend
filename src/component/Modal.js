/* eslint-disable eqeqeq */
import React from "react";
import { atom, useRecoilState } from "recoil";
import CloseButton from "../img/x_button.svg";
import "../css/Modal.css";

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
        <div>{userModal === 1 ? "카뎃 정보" : "도서 정보"}</div>
      </div>
    </div>
  );
};

export default Modal;
