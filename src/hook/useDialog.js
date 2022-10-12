import React, { useState } from "react";
import Modal from "../component/utils/Modal";
import ModalFooter from "../component/utils/ModalFooter";
import ModalHeader from "../component/utils/ModalHeader";
import "../css/Dialog.css";

const useDialog = () => {
  // 모달의 기본 로직 + 미리 조립해둔 대화창 형태의 모달 제공
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState({
    title: "",
    message: "",
    afterCloseFunction: () => {},
  });

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    config.afterCloseFunction();
    setIsOpen(false);
  };

  const dialogElement = () => {
    return (
      <>
        {isOpen && (
          <Modal isOpen={isOpen} onCloseModal={closeDialog}>
            <ModalHeader
              title={config.title}
              isWithCloseButton
              onCloseModal={closeDialog}
            />
            <div className="modal__dialog">
              <p className="modal__dialog__message">{config.message}</p>
            </div>
            <ModalFooter onConfirm={closeDialog} />
          </Modal>
        )}
      </>
    );
  };
  return [openDialog, closeDialog, config, setConfig, dialogElement];
};

export default useDialog;
