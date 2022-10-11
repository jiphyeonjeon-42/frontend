import React, { useState } from "react";
import Modal from "../component/utils/Modal";

const useModal = () => {
  // 모달에 필요한 기본 로직, 상태를 함께 제공
  const [isOpen, setIsOpen] = useState();
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const modalElement = ({ children }) => {
    return (
      <>
        {isOpen && (
          <Modal isOpen={isOpen} onCloseModal={toggleModal}>
            {children}
          </Modal>
        )}
      </>
    );
  };
  return [isOpen, toggleModal, modalElement];
};

export default useModal;
