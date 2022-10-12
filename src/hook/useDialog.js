import React, { useState } from "react";
import useModal from "./useModal";
import ModalFooter from "../component/utils/ModalFooter";
import ModalHeader from "../component/utils/ModalHeader";
import "../css/Dialog.css";

const useDialog = () => {
  // 모달의 기본 로직 + 미리 조립해둔 대화창 형태의 모달 제공
  const [isOpen, toggleModal, Modal] = useModal();
  const [config, setConfig] = useState({
    title: "",
    message: "",
    afterConfirmFunction: () => {},
  });

  const dialogElement = () => {
    const confirm = () => {
      toggleModal();
      config.afterConfirmFunction();
    };
    return (
      <>
        <Modal>
          <ModalHeader
            title={config.title}
            isWithCloseButton
            onCloseModal={toggleModal}
          />
          <div className="modal__dialog">
            <p className="modal__dialog__message">{config.message}</p>
          </div>
          <ModalFooter onConfirm={confirm} />
        </Modal>
      </>
    );
  };
  return [isOpen, toggleModal, config, setConfig, dialogElement];
};

export default useDialog;
