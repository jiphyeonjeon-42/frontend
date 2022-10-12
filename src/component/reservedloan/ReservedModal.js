/* eslint-disable react/forbid-prop-types */
import React from "react";
import PropTypes from "prop-types";
import MidModal from "../utils/MidModal";
import ReservedModalContents from "./ReservedModalContents";
import useDialog from "../../hook/useDialog";

const ReservedModal = ({ reservedInfo, closeModal }) => {
  const {
    setOpen: openDialog,
    config: dialogConfig,
    setConfig: setDialogConfig,
    Dialog,
  } = useDialog();
  const setDialogTitleAndMessage = (title, message) => {
    setDialogConfig({
      ...dialogConfig,
      title,
      message,
      afterCloseFunction: () => {
        closeModal();
        window.location.reload();
      },
    });
  };

  return (
    <>
      <Dialog />
      <MidModal closeModal={closeModal}>
        <ReservedModalContents
          reservedInfo={reservedInfo}
          setDialogTitleAndMessage={setDialogTitleAndMessage}
          openDialog={openDialog}
        />
      </MidModal>
    </>
  );
};

ReservedModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  reservedInfo: PropTypes.object.isRequired,
};

export default ReservedModal;
