import React from "react";
import useModal from "./useModal";
import ModalFooter from "../component/utils/ModalFooter";
import ModalHeader from "../component/utils/ModalHeader";
import "../css/Dialog.css";

const useDialog = () => {
  // 모달의 기본 로직 + 미리 조립해둔 대화창 형태의 모달 제공
  const [isOpen, toggleModal, Modal] = useModal();

  const dialogElement = ({ title, message }) => {
    return (
      <>
        <Modal>
          <ModalHeader
            title={title}
            isWithCloseButton
            onCloseModal={toggleModal}
          />
          <div className="modal__dialog">
            <p className="modal__dialog__message">{message}</p>
          </div>
          <ModalFooter onConfirm={toggleModal} />
        </Modal>
      </>
    );
  };
  return [isOpen, toggleModal, dialogElement];
};

export default useDialog;
