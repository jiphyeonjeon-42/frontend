import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import UserConfirm from "./UserConfirm";
import getErrorMessage from "../../data/error";
import SuccessRsv from "./SuccessRsv";
import ModalContentsOnlyTitle from "../utils/ModalContentsTitleWithMessage";

const Reservation = ({ bookInfoId, closeModal, setClosable }) => {
  const [reservationStep, setReservationStep] = useState("waitUserConfirm");
  const [propsNumber, setPropsNumber] = useState(-1);
  const [propsString, setPropsString] = useState("");
  const postReservation = async () => {
    await axios
      .post(`${process.env.REACT_APP_API}/reservations`, {
        bookInfoId,
      })
      .then(response => {
        setPropsNumber(response.data.count);
        setReservationStep("success");
        if (response.data.count === 1) {
          const date = response.data.lenderableDate;
          setPropsString(date.slice(2, 10).replaceAll("-", "."));
        }
      })
      .catch(error => {
        if (!error.response) return;
        const { status } = error.response;
        const errMessage =
          status === 400
            ? getErrorMessage(error.response.data.errorCode)
            : error.message;
        setPropsString(errMessage);
        setReservationStep("failure");
      });
  };

  const tryReservation = async () => {
    setClosable(false);
    setReservationStep("");
    postReservation();
    setClosable(true);
  };

  const ComponentForStep = () => {
    switch (reservationStep) {
      case "waitUserConfirm":
        return (
          <UserConfirm
            bookInfoId={bookInfoId}
            closeModal={closeModal}
            onConfirm={tryReservation}
            setReservationStep={setReservationStep}
            setErrorMessage={setPropsString}
          />
        );
      case "success":
        return (
          <SuccessRsv
            closeModal={closeModal}
            rank={propsNumber}
            lendabledate={propsString}
          />
        );
      case "failure":
        return (
          <ModalContentsOnlyTitle closeModal={closeModal} title={propsString} />
        );
      default:
        return null;
    }
  };
  useEffect(ComponentForStep, [reservationStep]);
  return ComponentForStep();
};

export default Reservation;

Reservation.propTypes = {
  bookId: PropTypes.number.isRequired,
  closeModal: PropTypes.func.isRequired,
  setClosable: PropTypes.func.isRequired,
};
