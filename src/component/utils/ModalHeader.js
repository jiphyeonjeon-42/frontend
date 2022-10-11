import React from "react";
import PropTypes from "prop-types";
import "../../css/ModalHeader.css";

const ModalHeader = ({ title, isWithCloseButton, onCloseModal }) => {
  return (
    <div className="modal__header">
      {title && <h1 className="modal__header__title">{title}</h1>}
      {isWithCloseButton && (
        <button
          type="button"
          className="modal__header__button"
          onClick={onCloseModal}
        >
          닫기
        </button>
      )}
    </div>
  );
};

ModalHeader.propTypes = {
  title: PropTypes.string,
  isWithCloseButton: PropTypes.bool,
  onCloseModal: PropTypes.func,
};

ModalHeader.defaultProps = {
  title: "",
  isWithCloseButton: true,
  onCloseModal: undefined,
};
export default ModalHeader;
