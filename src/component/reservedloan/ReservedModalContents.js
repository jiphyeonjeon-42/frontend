import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import getErrorMessage from "../../data/error";
import useDialog from "../../hook/useDialog";
import "../../css/ReservedModalContents.css";

const ReservedModalContents = ({ reservedInfo, closeModal }) => {
  if (!reservedInfo) return <div>!!</div>;
  const [remark, setRemark] = useState("");

  const {
    setOpen: openDialog,
    setClose: closeDialog,
    config: dialogConfig,
    setConfig: setDialogConfig,
    Dialog,
  } = useDialog();

  const setDialogTitleAndMessageAfterPost = (title, message) => {
    setDialogConfig({
      ...dialogConfig,
      title,
      message,
      afterClose: () => {
        closeModal();
        window.location.reload();
      },
      firstButton: {
        ...dialogConfig.firstButton,
        onClick: () => {
          closeDialog();
          closeModal();
          window.location.reload();
        },
      },
    });
  };

  const handleRemark = e => {
    e.preventDefault();
    setRemark(e.target.value);
  };

  const postData = async () => {
    if (!remark) return;
    const condition = remark;
    setRemark("");
    await axios
      .post(`${process.env.REACT_APP_API}/lendings`, {
        userId: reservedInfo.userId,
        bookId: reservedInfo.bookId,
        condition,
      })
      .then(() => {
        setDialogTitleAndMessageAfterPost(
          "대출이 완료되었습니다.",
          reservedInfo.title,
        );
        openDialog();
      })
      .catch(error => {
        if (!error.response) return;
        const errorCode = parseInt(error?.response?.data?.errorCode, 10);
        const [title, message] = getErrorMessage(errorCode).split("\r\n");
        setDialogTitleAndMessageAfterPost(title, message);
        openDialog();
      });
  };

  const deleteReservation = async () => {
    await axios
      .patch(
        `${process.env.REACT_APP_API}/reservations/cancel/${reservedInfo.reservationsId}`,
      )
      .then(() => {
        setDialogTitleAndMessageAfterPost("예약 취소가 완료되었습니다.", "");
      })
      .catch(error => {
        if (!error.response) return;
        const errorCode = parseInt(error?.response?.data?.errorCode, 10);
        const [title, message] = getErrorMessage(errorCode).split("\r\n");
        setDialogTitleAndMessageAfterPost(title, message);
      });
  };

  const confirmReservation = () => {
    setDialogConfig({
      ...dialogConfig,
      title: "예약을 취소하시겠습니까?",
      message: "주의 : 예약취소는 대기순위를 잃고 되돌릴 수 없습니다.",
      firstButton: {
        ...dialogConfig.firstButton,
        onClick: deleteReservation,
      },
    });
    openDialog();
  };

  return (
    <div className="reserved-modal__wrapper">
      <Dialog />
      <div className="reserved-modal__cover">
        <img
          src={reservedInfo.image}
          alt="cover"
          className="reserved-modal__cover-img"
        />
      </div>
      <div className="reserved-modal__detail">
        <div className="reserved-modal__book">
          <p className="reserved-modal__red-title">도서정보</p>
          <p className="reserved-modal__book-title reserved-modal__content">
            {reservedInfo.title}
          </p>
          {reservedInfo.bookId && reservedInfo.callSign ? (
            <p className="reserved-modal__sub-content">{`도서코드 : ${reservedInfo.callSign}`}</p>
          ) : null}
        </div>
        {reservedInfo.bookId && reservedInfo.endAt ? (
          <div className="reserved-modal__lend">
            <p className="reserved-modal__red-title">예약 만료일</p>
            <p className="reserved-modal__content">
              {reservedInfo.endAt ? reservedInfo.endAt.slice(0, 10) : "NULL"}
            </p>
          </div>
        ) : (
          <div className="reserved-modal__lend">
            <p className="reserved-modal__red-title">예약 시작일</p>
            <p className="reserved-modal__content">
              {reservedInfo.createdAt
                ? reservedInfo.createdAt.slice(0, 10)
                : "NULL"}
            </p>
          </div>
        )}
        <div className="reserved-modal__user">
          <p className="reserved-modal__red-title">유저정보</p>
          <p className="reserved-modal__content">{reservedInfo.login}</p>
          <p className="reserved-modal__sub-content">{`연체일수 : ${reservedInfo.penaltyDays}일`}</p>
        </div>
        <div className="reserved-modal__remark">
          <p className="reserved-modal__red-title">비고</p>
          <textarea
            className="reserved-modal__remark__input"
            placeholder="비고를 입력해주세요. (반납 시 책 상태 등)"
            value={remark}
            onChange={handleRemark}
          />
          <div className="reserved-modal__buttons">
            {!reservedInfo.status && reservedInfo.endAt ? (
              <button
                className={`reserved-modal__button  font-20 color-ff ${
                  remark && `confirm`
                }`}
                type="button"
                onClick={postData}
              >
                대출 완료하기
              </button>
            ) : (
              ``
            )}
            {reservedInfo.status ? (
              ``
            ) : (
              <button
                className="reserved-modal__button  font-20 color-ff confirm"
                type="button"
                onClick={confirmReservation}
              >
                예약취소
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

ReservedModalContents.propTypes = {
  reservedInfo: PropTypes.shape.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default ReservedModalContents;
