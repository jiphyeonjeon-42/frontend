/* eslint-disable eqeqeq */
import React from "react";
import { atom, useRecoilState } from "recoil";
import CloseButton from "../../img/x_button.svg";
import "../../css/Modal.css";
import ModalBook from "./ModalBook";
import ModalUser from "./ModalUser";

export const isModalOpen = atom({ key: "isModalOpen", default: 0 });

// eslint-disable-next-line react/prop-types
const Modal = ({ setSelectUser, setSelectBooks, selectBooks }) => {
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
          <ModalBook
            setSelectBooks={setSelectBooks}
            selectBooks={selectBooks}
            setUserModal={setUserModal}
          />
        )}
      </div>
    </div>
  );
};

export default Modal;