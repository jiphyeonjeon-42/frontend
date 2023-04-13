import { useState } from "react";
import Modal from "../component/utils/Modal";
import ModalHeader from "../component/utils/ModalHeader";

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const setOpen = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const [config, setConfig] = useState({
    size: "full",
    isWithCloseButton: true,
    afterClose: () => {},
  });

  const setClose = () => {
    close();
    config.afterClose();
  };

  const modalElement = ({ children }) => {
    return (
      <>
        {isOpen && (
          <Modal isOpen={isOpen} onCloseModal={setClose} size={config.size}>
            {config.isWithCloseButton && (
              <ModalHeader isWithCloseButton onCloseModal={setClose} />
            )}
            {children}
          </Modal>
        )}
      </>
    );
  };
  return { isOpen, setOpen, setClose, config, setConfig, Modal: modalElement };
};

export default useModal;
