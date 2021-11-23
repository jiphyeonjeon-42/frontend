import React, { useState } from "react";
import PropTypes from "prop-types";
import MiniModal from "../utils/MiniModal";
import MidModal from "../utils/MidModal";
import ModalContentsOnlyTitle from "../utils/ModalContentsOnlyTitle";
import ModalContentsTitleWithMessage from "../utils/ModalContentsTitleWithMessage";
import RentModalContents from "./RentModalContents";

const RentModal = ({ selectUser, selectBooks, handleModal }) => {
  const [miniModalContents, setMiniModalContents] = useState("");
  const [lendResult, setLendResult] = useState(false);

  const closeMiniModal = () => {
    setMiniModalContents("");
    handleModal();
    window.location.reload();
  };
  const bookTitle =
    selectBooks.length === 1
      ? selectBooks[0].info.title
      : `${selectBooks[0].info.title}\n${selectBooks[1].info.title}`;

  return (
    <>
      {miniModalContents ? (
        <MiniModal closeModal={closeMiniModal}>
          {lendResult ? (
            <ModalContentsTitleWithMessage
              closeModal={closeMiniModal}
              title="대출이 완료되었습니다."
              message={bookTitle}
            />
          ) : (
            <ModalContentsOnlyTitle
              closeModal={closeMiniModal}
              title={miniModalContents}
            />
          )}
        </MiniModal>
      ) : (
        <MidModal closeModal={handleModal}>
          <RentModalContents
            selectUser={selectUser}
            selectBooks={selectBooks}
            closeModal={handleModal}
            setMiniModalContents={setMiniModalContents}
            setLendResult={setLendResult}
          />
        </MidModal>
      )}
    </>
  );
};

RentModal.propTypes = {
  handleModal: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  selectUser: PropTypes.object.isRequired,
  selectBooks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RentModal;
