import React from "react";
import { atom, useRecoilState } from "recoil";
import PropTypes from "prop-types";
import CloseButton from "../../img/x_button.svg";
import "../../css/Modal.css";
import ModalBook from "./ModalBook";
import ModalUser from "./ModalUser";

export const isModalOpen = atom({ key: "isModalOpen", default: 0 });

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

Modal.propTypes = {
  setSelectBooks: PropTypes.func.isRequired,
  setSelectUser: PropTypes.func.isRequired,
  selectBooks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Modal;
