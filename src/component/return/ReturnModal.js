import React, { useState } from "react";
import PropTypes from "prop-types";
import MiniModal from "../utils/MiniModal";
import MidModal from "../utils/MidModal";
import ModalContentsOnlyTitle from "../utils/ModalContentsOnlyTitle";
import ModalContentsTitleWithMessage from "../utils/ModalContentsTitleWithMessage";
import ReturnModalContents from "./ReturnModalContents";

const ReturnModal = ({ lendingId, closeModal }) => {
  const [miniModalContents, setMiniModalContents] = useState("");
  const [returnResult, setReturnResult] = useState(false);

  const closeMiniModal = () => {
    setMiniModalContents("");
    closeModal();
    window.location.reload();
  };

  return (
    <>
      {miniModalContents ? (
        <MiniModal closeModal={closeMiniModal}>
          {returnResult ? (
            <ModalContentsTitleWithMessage
              closeModal={closeMiniModal}
              title="반납이 완료되었습니다."
              message={miniModalContents}
            />
          ) : (
            <ModalContentsOnlyTitle
              closeModal={closeMiniModal}
              title={miniModalContents}
            />
          )}
        </MiniModal>
      ) : (
        <MidModal closeModal={closeModal}>
          <ReturnModalContents
            lendingId={lendingId}
            closeModal={closeModal}
            setMiniModalContents={setMiniModalContents}
            setReturnResult={setReturnResult}
          />
        </MidModal>
      )}
    </>
  );
};

export default ReturnModal;

ReturnModal.propTypes = {
  lendingId: PropTypes.number.isRequired,
  closeModal: PropTypes.func.isRequired,
};
