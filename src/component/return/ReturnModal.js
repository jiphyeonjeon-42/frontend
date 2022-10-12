import React from "react";
import PropTypes from "prop-types";
import MidModal from "../utils/MidModal";
import ReturnModalContents from "./ReturnModalContents";
import useDialog from "../../hook/useDialog";

const ReturnModal = ({ lendingId, closeModal }) => {
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
        <ReturnModalContents
          lendingId={lendingId}
          closeModal={closeModal}
          openDialog={openDialog}
          setDialogTitleAndMessage={setDialogTitleAndMessage}
        />
      </MidModal>
    </>
  );
};

export default ReturnModal;

ReturnModal.propTypes = {
  lendingId: PropTypes.number.isRequired,
  closeModal: PropTypes.func.isRequired,
};
