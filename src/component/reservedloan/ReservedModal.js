/* eslint-disable react/forbid-prop-types */
import React, { useState } from "react";
import PropTypes from "prop-types";
import MiniModal from "../utils/MiniModal";
import MidModal from "../utils/MidModal";
import ModalContentsOnlyTitle from "../utils/ModalContentsOnlyTitle";
import ModalContentsTitleWithMessage from "../utils/ModalContentsTitleWithMessage";
import ReservedModalContents from "./ReservedModalContents";

const ReservedModal = ({ reservedInfo, closeModal }) => {
  const [miniModalContents, setMiniModalContents] = useState("");
  const [lendResult, setLendResult] = useState(false);

  const closeMiniModal = () => {
    setMiniModalContents("");
    closeModal();
    window.location.reload();
  };

  return (
    <>
      {miniModalContents.length ? (
        <MiniModal closeModal={closeMiniModal}>
          {lendResult ? (
            <ModalContentsTitleWithMessage
              closeModal={closeMiniModal}
              title={miniModalContents}
              message={reservedInfo.title}
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
          <ReservedModalContents
            reservedInfo={reservedInfo}
            setMiniModalContents={setMiniModalContents}
            setLendResult={setLendResult}
          />
        </MidModal>
      )}
    </>
  );
};

ReservedModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  reservedInfo: PropTypes.object.isRequired,
};

export default ReservedModal;
