import React from "react";
import PropTypes from "prop-types";
import Image from "../utils/Image";
import useGetReservationsCount from "../../api/reservations/useGetReservationsCount";
import usePostReservations from "../../api/reservations/usePostReservations";
import Available from "../../img/arrow_right_res.svg";
import Unavailable from "../../img/arrow_right_res_default.svg";
import "../../css/Reservation.css";

const BookReservation = ({
  bookInfoId,
  isAvailableReservation,
  dialogDefaultConfig,
  setDialogConfig,
  setOpenTitleAndMessage,
  openDialog,
}) => {
  if (!isAvailableReservation)
    return (
      <div className="reservation__rentable">
        대출 가능
        <Image src={Unavailable} alt="대출" />
      </div>
    );

  const { postReservation } = usePostReservations({
    bookInfoId,
    dialogDefaultConfig,
    setDialogConfig,
    openDialog,
    setOpenTitleAndMessage,
  });

  const { getCountReservation } = useGetReservationsCount({
    bookInfoId,
    dialogDefaultConfig,
    setDialogConfig,
    openDialog,
    setOpenTitleAndMessage,
    postReservation,
  });

  const tryReservation = getCountReservation;

  return (
    <>
      <button
        className="reservation__button"
        type="button"
        onClick={tryReservation}
      >
        예약 하기
        <Image src={Available} alt="예약" />
      </button>
    </>
  );
};

export default BookReservation;

BookReservation.propTypes = {
  bookInfoId: PropTypes.number.isRequired,
  isAvailableReservation: PropTypes.bool.isRequired,
  dialogDefaultConfig: PropTypes.shape.isRequired,
  setDialogConfig: PropTypes.func.isRequired,
  setOpenTitleAndMessage: PropTypes.func.isRequired,
  openDialog: PropTypes.func.isRequired,
};
