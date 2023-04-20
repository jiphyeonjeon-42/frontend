import { MouseEvent, useEffect } from "react";
import { createPortal } from "react-dom";
import "../../css/Modal.css";

/* chidren 컴포넌트를 조립해서 사용하는 모달, 최소 기능만 포함된 기본형
modal__backdrop 어두워지는 뒷배경, 클릭시 모달 종료
modal__container 모달의 기본 뼈대
*/

type ModalProps = {
  isOpen: boolean;
  size: string;
  onCloseModal(): void;
  children: React.ReactNode;
};

const Modal = ({
  isOpen = false,
  onCloseModal,
  children,
  size = "basic",
}: ModalProps) => {
  useEffect(() => {
    const closeModalWithESC: EventListener = event => {
      if (event instanceof KeyboardEvent && event.key === "Escape")
        onCloseModal();
    };

    window.addEventListener("keydown", closeModalWithESC);
    document.body.style.cssText = `overflow: hidden`;

    return () => {
      window.removeEventListener("keydown", closeModalWithESC);
      document.body.style.cssText = `overflow: none`;
    };
  }, []);

  if (!isOpen) return null;

  const modalSize = () => {
    const candidate = ["full", "basic"];
    return candidate.includes(size) ? size : "basic";
  };

  const closeModal = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    onCloseModal();
  };

  useEffect(() => {}, []);

  const preventEventBubbling = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  const modalPosition = document.getElementById("modal");

  return (
    modalPosition &&
    createPortal(
      <>
        <div
          className="modal__backdrop"
          onClick={closeModal}
          aria-hidden="true"
        >
          <div
            className={`modal__container ${modalSize()}`}
            onClick={preventEventBubbling}
          >
            {children}
          </div>
        </div>
      </>,
      modalPosition,
    )
  );
};

export default Modal;
