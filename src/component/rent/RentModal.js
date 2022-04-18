import React, { useState } from "react";
import PropTypes from "prop-types";
import MidModal from "../utils/MidModal";
import RentModalConfirm from "./RentModalConfirm";
import RentModalUser from "./RentModalUser";
import RentModalBook from "./RentModalBook";
import MiniModal from "../utils/MiniModal";
import ModalContentsOnlyTitle from "../utils/ModalContentsOnlyTitle";
import ModalContentsTitleWithMessage from "../utils/ModalContentsTitleWithMessage";

const RentModal = ({
  selectedUser,
  selectedBooks,
  midModalContents,
  setSelectedUser,
  setSelectedBooks,
  setMidModalContents,
}) => {
  const [miniModalContents, setMiniModalContents] = useState("");
  const [rentResult, setRentResult] = useState(false);

  const bookTitle = () => {
    if (selectedBooks.length === 0) return "";
    if (selectedBooks.length === 1) return selectedBooks[0].info.title;
    return `${selectedBooks[0].info.title}\n${selectedBooks[1].info.title}`;
  };

  const closeMiniModal = () => {
    setMiniModalContents("");
    setMidModalContents("");
    window.location.reload();
  };

  const closeMidModal = () => {
    setMidModalContents("");
  };

  return (
    <>
      {miniModalContents && (
        <MiniModal closeModal={closeMiniModal}>
          {rentResult ? (
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
      )}
      <MidModal closeModal={closeMidModal}>
        {midModalContents === "inquire user" && (
          <RentModalUser
            setSelectedUser={setSelectedUser}
            closeMidModal={closeMidModal}
          />
        )}
        {midModalContents === "inquire book" && (
          <RentModalBook
            selectedBooks={selectedBooks}
            setSelectedBooks={setSelectedBooks}
            closeMidModal={closeMidModal}
          />
        )}
        {midModalContents === "last confirm" && (
          <RentModalConfirm
            selectedUser={selectedUser}
            selectedBooks={selectedBooks}
            closeModal={closeMidModal}
            setMiniModalContents={setMiniModalContents}
            setRentResult={setRentResult}
          />
        )}
      </MidModal>
    </>
  );
};

RentModal.propTypes = {
  selectedUser: PropTypes.shape({
    is: PropTypes.number,
    login: PropTypes.string,
    isPenalty: PropTypes.bool,
    lendingCnt: PropTypes.number,
    lendings: PropTypes.number,
    reservations: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  selectedBooks: PropTypes.arrayOf(PropTypes.object).isRequired,
  midModalContents: PropTypes.string.isRequired,
  setSelectedUser: PropTypes.func.isRequired,
  setSelectedBooks: PropTypes.func.isRequired,
  setMidModalContents: PropTypes.func.isRequired,
};

export default RentModal;
