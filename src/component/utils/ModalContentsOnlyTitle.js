import React from "react";
import PropTypes from "prop-types";

const ModalContentsOnlyTitle = ({ closeModal, title }) => {
  return (
    <div className="modal__wrapper">
      <div className="mini-modal__text">
        <p className="mini-modal__text__title font-32-bold color-2d">{title}</p>
      </div>
      <div>
        <button
          className="modal__button confirm mini font-20 color-ff"
          type="button"
          onClick={closeModal}
        >
          확인하기
        </button>
      </div>
    </div>
  );
};

export default ModalContentsOnlyTitle;

ModalContentsOnlyTitle.propTypes = {
  closeModal: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};
