import { useState } from "react";
import { DialogConfig } from "../../type/DialogConfig";
import Modal from "./Modal";
import ModalHeader from "./ModalHeader";
import ModalFooter from "./ModalFooter";

const Dialog = ({
  title,
  message,
  afterClose = () => {},
  titleEmphasis = "",
  buttonAlign = "basic",
  numberOfButtons = 1,
  firstButton = {
    text: "확인하기",
    color: "red",
  },
  secondButton = {
    text: "취소하기",
    color: "grey",
  },
}: DialogConfig) => {
  const [isOpened, setOpened] = useState(true);

  const closeDialog = () => {
    if (afterClose) {
      afterClose();
    }
    setOpened(false);
  };

  return (
    <Modal isOpen={isOpened} onCloseModal={closeDialog}>
      <ModalHeader
        title={title}
        emphasis={titleEmphasis}
        isWithCloseButton
        onCloseModal={closeDialog}
      />
      <div className="modal__dialog">
        <p className="modal__dialog__message">{message}</p>
      </div>
      <ModalFooter
        align={buttonAlign}
        numberOfButtons={numberOfButtons || 1}
        firstButtonText={firstButton?.text || "확인하기"}
        firstButtonColor={firstButton?.color || "red"}
        firstButtonOnClick={() => {
          if (firstButton.onClick) {
            firstButton.onClick();
          }
          closeDialog();
        }}
        isFirstButtonFocusedOnMount
        secondButtonText={secondButton.text || "취소하기"}
        secondButtonColor={secondButton.color || "grey"}
        secondButtonOnClick={() => {
          if (secondButton.onClick) {
            secondButton.onClick();
          }
          closeDialog();
        }}
      />
    </Modal>
  );
};

export default Dialog;
