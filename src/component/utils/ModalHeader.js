import React from "react";
import PropTypes from "prop-types";
import EmphasisInString from "./EmphasisInString";
import "../../css/ModalHeader.css";

const ModalHeader = ({
  title,
  isWithCloseButton,
  onCloseModal,
  emphasis,
  emphasisColor,
}) => {
  return (
    <div className="modal__header">
      {title && (
        <h1 className="modal__header__title">
          <EmphasisInString
            wholeString={title}
            emphasis={emphasis}
            emphasisColorString={emphasisColor}
          />
        </h1>
      )}
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
  emphasis: PropTypes.string,
  emphasisColor: PropTypes.string,
};

ModalHeader.defaultProps = {
  title: "",
  isWithCloseButton: true,
  onCloseModal: undefined,
  emphasis: "",
  emphasisColor: "red",
};
export default ModalHeader;
