import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import useDialog from "../../hook/useDialog";
import getErrorMessage from "../../data/error";
import "../../css/Reservation.css";
import Available from "../../img/arrow_right_res.svg";
import Unavailable from "../../img/arrow_right_res_default.svg";

const Reservation = ({ bookInfoId, isAvailableReservation }) => {
  if (!isAvailableReservation)
    return (
      <div className="reservation__rentable">
        대출 가능
        <img src={Unavailable} alt="대출" />
      </div>
    );

  const {
    setOpen: openDialog,
    config: dialogConfig,
    setConfig: setDialogConfig,
    defaultConfig: dialogDefaultConfig,
    setTitleAndMessage: setDialogTitleAndMessage,
    Dialog,
  } = useDialog();

  const postReservation = async () => {
    await axios
      .post(`${process.env.REACT_APP_API}/reservations`, {
        bookInfoId,
      })
      .then(response => {
        const rank = response?.data?.count;
        const lendabledate = response?.data?.lenderableDate?.slice(0, 10);
        const title = `예약 ${rank}순위로 등록되셨습니다.`;
        const message =
          rank === 1 && lendabledate
            ? `대출 가능 예상일자는 ${lendabledate}.입니다.`
            : "대출이 가능해지면 Slack 알림을 보내드리겠습니다.";
        setDialogConfig({
          ...dialogDefaultConfig,
          title,
          titleEmphasis: `${rank}순위`,
          message,
        });
        openDialog();
      })
      .catch(error => {
        if (!error.response) return;
        const errorCode = parseInt(error?.response?.data?.errorCode, 10);
        const [title, message] = getErrorMessage(errorCode).split("\r\n");
        setDialogConfig({ ...dialogDefaultConfig, title, message });
        openDialog();
      });
  };

  const getCountReservation = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_API}/reservations/count?bookInfo=${bookInfoId}`,
      )
      .then(response => {
        const expectedRank = response?.data?.count;

        const title = `현재 예약대기자는 ${expectedRank}명입니다.
예약하시겠습니까?`;
        const message = `주의: 예약도서는 2권 이상 대출할 수 없거나, 연체회원일 경우 대출이 제한됩니다.`;
        setDialogConfig({
          ...dialogConfig,
          firstButton: {
            ...dialogConfig.firstButton,
            onClick: postReservation,
          },
          title,
          titleEmphasis: `${expectedRank}명`,
          message,
        });
        openDialog();
      })
      .catch(error => {
        if (!error.response) return;
        const errorCode = parseInt(error?.response?.data?.errorCode, 10);
        const [title, message] = getErrorMessage(errorCode).split("\r\n");
        setDialogTitleAndMessage(title, message);
        openDialog();
      });
  };

  const tryReservation = async () => {
    setDialogConfig(dialogDefaultConfig);
    await getCountReservation();
  };

  return (
    <>
      <button
        className="reservation__button"
        type="button"
        onClick={tryReservation}
      >
        예약 하기
        <img src={Available} alt="예약" />
      </button>
      <Dialog />
    </>
  );
};

export default Reservation;

Reservation.propTypes = {
  bookInfoId: PropTypes.number.isRequired,
  isAvailableReservation: PropTypes.bool.isRequired,
};
