/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import "../../css/Modal.css";

/* chidren 컴포넌트를 조립해서 사용하는 모달, 최소 기능만 포함된 기본형
    modal__backdrop 어두워지는 뒷배경, 클릭시 모달 종료
    modal__container 모달의 기본 뼈대
 */

const Modal = ({ isOpen, onCloseModal, children, size }) => {
  useEffect(() => {
    const closeModalWithESC = e => e.keyCode === 27 && onCloseModal();
    window.addEventListener("keydown", closeModalWithESC);
    // 모달 활성화시 기본화면의 스크롤 제한
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

  const onClickBackdrop = e => {
    e.preventDefault();
    onCloseModal();
  };

  useEffect(() => {}, []);

  const onClickContainer = e => {
    // 이벤트 버블링 방지
    e.stopPropagation();
  };
  // 선언된 위치가 아닌 지정된 위치에 생성
  const modalPosition = document.getElementById("modal");

  return createPortal(
    <>
      <div
        className="modal__backdrop"
        onClick={onClickBackdrop}
        aria-hidden="true"
      >
        <div
          className={`modal__container ${modalSize()}`}
          onClick={onClickContainer}
          onKeyPress={onClickContainer}
        >
          {children}
        </div>
      </div>
    </>,
    modalPosition,
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool,
  size: PropTypes.string,
  onCloseModal: PropTypes.func,
  children: PropTypes.node,
};

Modal.defaultProps = {
  isOpen: false,
  size: "basic",
  onCloseModal: undefined,
};

export default Modal;
