import React from "react";
import PropTypes from "prop-types";
import MidModal from "../utils/MidModal";
import RentModalConfirm from "./RentModalConfirm";
import RentModalUser from "./RentModalUser";
import RentModalBook from "./RentModalBook";

const RentModal = ({
  selectedUser,
  selectedBooks,
  midModalContents,
  setSelectedUser,
  setSelectedBooks,
  setMidModalContents,
  setMiniModalContents,
}) => {
  const closeMidModal = () => {
    setMidModalContents("");
  };

  return (
    <>
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
          />
        )}
      </MidModal>
    </>
  );
};

RentModal.propTypes = {
  selectedUser: PropTypes.shape({
    email: PropTypes.string,
    id: PropTypes.number,
    lendings: PropTypes.arrayOf(PropTypes.object),
    nickname: PropTypes.string,
    penaltyEndDate: PropTypes.string,
    reservations: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  selectedBooks: PropTypes.arrayOf(PropTypes.object).isRequired,
  midModalContents: PropTypes.string.isRequired,
  setSelectedUser: PropTypes.func.isRequired,
  setSelectedBooks: PropTypes.func.isRequired,
  setMidModalContents: PropTypes.func.isRequired,
  setMiniModalContents: PropTypes.func.isRequired,
};

export default RentModal;
