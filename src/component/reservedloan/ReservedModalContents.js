import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import getErrorMessage from "../../data/error";

const ReservedModalContents = ({
  reservedInfo,
  setMiniModalContents,
  setLendResult,
}) => {
  const [remark, setRemark] = useState("");

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
        setMiniModalContents("대출이 완료되었습니다.");
        setLendResult(true);
      })
      .catch(error => {
        if (!error.response) return;
        const { status } = error.response;
        setLendResult(false);
        setMiniModalContents(
          status === 400
            ? getErrorMessage(error.response.data.errorCode)
            : error.message,
        );
      });
  };

  const deleteReservation = async () => {
    // eslint-disable-next-line no-alert
    if (window.confirm("정말로 취소하시나요?")) {
      await axios
        .patch(
          `${process.env.REACT_APP_API}/reservations/cancel/${reservedInfo.reservationsId}`,
        )
        .then(() => {
          setMiniModalContents("예약 취소가 완료되었습니다.");
          setLendResult(true);
        })
        .catch(error => {
          if (!error.response) return;
          const { status } = error.response;
          setLendResult(false);
          setMiniModalContents(
            status === 400
              ? getErrorMessage(error.response.data.errorCode)
              : error.message,
          );
        });
    }
  };

  return (
    <div className="modal__wrapper mid">
      <div className="mid-modal__cover">
        <img
          src={reservedInfo.image}
          alt="cover"
          className="mid-modal__cover-img"
        />
      </div>
      <div className="mid-modal__detail">
        <div className="mid-modal__book">
          <p className="font-16 color-red">도서정보</p>
          <p className="mid-modal__book-title font-28-bold color-54  margin-8">
            {reservedInfo.title}
          </p>
          {reservedInfo.bookId && reservedInfo.callSign ? (
            <p className="font-16 color-54">{`도서코드 : ${reservedInfo.callSign}`}</p>
          ) : null}
        </div>
        {reservedInfo.bookId && reservedInfo.endAt ? (
          <div className="mid-modal__lend">
            <p className="font-16 color-red">예약 만료일</p>
            <p className="font-28-bold color-54  margin-8">
              {reservedInfo.endAt ? reservedInfo.endAt.slice(0, 10) : "NULL"}
            </p>
          </div>
        ) : (
          <div className="mid-modal__lend">
            <p className="font-16 color-red">예약 시작일</p>
            <p className="font-28-bold color-54  margin-8">
              {reservedInfo.createdAt
                ? reservedInfo.createdAt.slice(0, 10)
                : "NULL"}
            </p>
          </div>
        )}
        <div className="mid-modal__user">
          <p className="font-16 color-red">유저정보</p>
          <p className="font-28-bold color-54  margin-8">
            {reservedInfo.login}
          </p>
          <p className="font-16 color-54">{`연체일수 : ${reservedInfo.penaltyDays}일`}</p>
        </div>
        <div className="mid-modal__remark">
          <p className="font-16 color-red">비고</p>
          <textarea
            className="mid-modal__remark__input margin-8 font-16"
            placeholder="비고를 입력해주세요. (반납 시 책 상태 등)"
            value={remark}
            onChange={handleRemark}
          />
          <div className="modal__buttons">
            {!reservedInfo.status && reservedInfo.endAt ? (
              <button
                className={`modal__button mid font-20 color-ff ${
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
                className="modal__button mid font-20 color-ff confirm"
                type="button"
                onClick={deleteReservation}
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
  setMiniModalContents: PropTypes.func.isRequired,
  setLendResult: PropTypes.func.isRequired,
};

export default ReservedModalContents;
