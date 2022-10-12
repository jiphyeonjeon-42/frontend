import React, { useState } from "react";
import Modal from "../component/utils/Modal";
import ModalFooter from "../component/utils/ModalFooter";
import ModalHeader from "../component/utils/ModalHeader";
import "../css/Dialog.css";

const useDialog = () => {
  // 모달의 기본 로직 + 미리 조립해둔 대화창 형태의 모달 제공
  const [isOpen, setIsOpen] = useState(false);

  const setOpen = () => {
    setIsOpen(true);
  };

  const setClose = () => {
    setIsOpen(false);
  };

  const [config, setConfig] = useState({
    afterClose: () => {},
    title: "",
    message: "",
    buttonAlign: "basic",
    numberOfButtons: 1,
    firstButton: {
      text: "확인하기",
      color: "red",
      onClick: () => {
        setClose();
      },
    },
    secondButton: {
      text: "취소하기",
      color: "grey",
      onClick: () => {
        setClose();
      },
    },
  });

  const setTitleAndMessage = (title, message) => {
    setConfig(...config, title, message);
  };

  const onClose = () => {
    setClose();
    config.afterClose();
  };

  const Dialog = () => {
    return (
      <>
        {isOpen && (
          <Modal isOpen={isOpen} onCloseModal={onClose}>
            <ModalHeader
              title={config.title}
              isWithCloseButton
              onCloseModal={onClose}
            />
            <div className="modal__dialog">
              <p className="modal__dialog__message">{config.message}</p>
            </div>
            <ModalFooter
              align={config.buttonAlign}
              numberOfButtons={config.numberOfButtons}
              firstButtonOnClick={config.firstButton.onClick}
              secondButtonOnClick={config.secondButton.onClick}
            />
          </Modal>
        )}
      </>
    );
  };
  return {
    isOpen,
    setOpen,
    setClose,
    config,
    setConfig,
    setTitleAndMessage,
    Dialog,
  };
};

export default useDialog;
