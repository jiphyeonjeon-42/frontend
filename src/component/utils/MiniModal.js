import React from "react";
import PropTypes from "prop-types";
import "../../css/MiniModal.css";
import CloseButton from "../../img/x_button.svg";

const MiniModal = ({ closeModal, children }) => {
  const stopEventBubbling = e => {
    e.stopPropagation();
  };

  return (
    <button
      className="modal__background mini"
      type="button"
      onClick={closeModal}
    >
      <button
        className="modal__container mini"
        type="button"
        onClick={stopEventBubbling}
      >
        <button
          className="modal__close-button mini"
          type="button"
          onClick={closeModal}
        >
          <img src={CloseButton} alt="close" />
        </button>
        {children}
      </button>
    </button>
  );
};

export default MiniModal;

MiniModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
