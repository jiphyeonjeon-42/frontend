import React from "react";
import PropTypes from "prop-types";
import "../../css/ModalFooter.css";

const ModalFooter = ({
  align,
  isWithCancelButton,
  onConfirm,
  onCancel,
  confirmText,
  cancelText,
}) => {
  const buttonAlign = () => {
    if (align === "center") return align;
    return "right";
  };
  return (
    <>
      <div className={`modal__footer ${buttonAlign()}`}>
        <button type="button" onClick={onConfirm}>
          {confirmText}
        </button>
        {isWithCancelButton && (
          <button type="button" onClick={onCancel}>
            {cancelText}
          </button>
        )}
      </div>
    </>
  );
};

ModalFooter.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  isWithCancelButton: PropTypes.bool,
  onCancel: PropTypes.func,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  align: PropTypes.string,
};

ModalFooter.defaultProps = {
  align: "right",
  isWithCancelButton: false,
  onCancel: undefined,
  confirmText: "확인하기",
  cancelText: "취소하기",
};
export default ModalFooter;
