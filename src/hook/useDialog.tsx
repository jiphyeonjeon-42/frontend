import { useState } from "react";
import Modal from "../component/utils/Modal";
import ModalFooter from "../component/utils/ModalFooter";
import ModalHeader from "../component/utils/ModalHeader";
import "../asset/css/Dialog.css";

type DialogButton = {
  text: string;
  color: string;
  onClick: () => void;
};

type DialogConfig = {
  afterClose: () => void;
  title: string;
  titleEmphasis: string;
  message: string;
  buttonAlign: string;
  numberOfButtons: number;
  firstButton: DialogButton;
  secondButton: DialogButton;
};

export const useDialog = () => {
  // 모달의 기본 로직 + 미리 조립해둔 대화창 형태의 모달 제공
  const [isOpen, setIsOpen] = useState(false);
  const setOpen = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const defaultConfig: DialogConfig = {
    afterClose: () => {},
    title: "",
    titleEmphasis: "",
    message: "",
    buttonAlign: "basic",
    numberOfButtons: 1,
    firstButton: {
      text: "확인하기",
      color: "red",
      onClick: close,
    },
    secondButton: {
      text: "취소하기",
      color: "grey",
      onClick: close,
    },
  };

  const [config, setConfig] = useState(defaultConfig);

  const setClose = () => {
    close();
    config.afterClose();
  };

  const setOpenConfirm = (
    title: string,
    message: string,
    confirmCallback = () => {},
  ) => {
    setConfig({
      ...defaultConfig,
      title,
      message,
      firstButton: {
        ...defaultConfig.firstButton,
        onClick: () => {
          confirmCallback();
          setClose();
        },
      },
    });
    setOpen();
  };

  const setOpenTitleAndMessage = (
    title: string,
    message: string,
    afterClose = () => {},
  ) => {
    setConfig({
      ...defaultConfig,
      title,
      message,
      afterClose,
      firstButton: {
        ...defaultConfig.firstButton,
        onClick: () => {
          setClose();
          afterClose();
        },
      },
    });
    setOpen();
  };

  const Dialog = () => {
    return (
      <>
        {isOpen && (
          <Modal isOpen={isOpen} onCloseModal={setClose}>
            <ModalHeader
              title={config.title}
              emphasis={config.titleEmphasis}
              isWithCloseButton
              onCloseModal={setClose}
            />
            <div className="modal__dialog">
              <p className="modal__dialog__message">{config.message}</p>
            </div>
            <ModalFooter
              align={config.buttonAlign}
              numberOfButtons={config.numberOfButtons}
              firstButtonText={config.firstButton.text}
              firstButtonColor={config.firstButton.color}
              firstButtonOnClick={config.firstButton.onClick}
              isFirstButtonFocusedOnMount
              secondButtonText={config.secondButton.text}
              secondButtonColor={config.secondButton.color}
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
    config, // for update
    defaultConfig, // for reset
    setConfig,
    setOpenTitleAndMessage,
    setOpenConfirm,
    Dialog,
  };
};
