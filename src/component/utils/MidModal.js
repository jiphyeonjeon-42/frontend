import React from "react";
import PropTypes from "prop-types";
import "../../css/MidModal.css";
import CloseButton from "../../img/x_button.svg";

const MidModal = ({ closeModal, children }) => {
  return (
    <div className="modal__background">
      <div className="modal__container mid">
        <button
          className="modal__close-button mini"
          type="button"
          onClick={closeModal}
        >
          <img src={CloseButton} alt="close" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default MidModal;

MidModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
