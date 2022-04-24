/* eslint-disable react/forbid-prop-types */
import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import getErrorMessage from "../utils/error";

const ReservedModalContents = ({
  reservedInfo,
  closeModal,
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
      .post(`${process.env.REACT_APP_API}/lendings`, [
        {
          userId: reservedInfo.user.id,
          bookId: reservedInfo.book.id,
          condition,
        },
      ])
      .then(() => {
        setMiniModalContents("success");
        setLendResult(true);
      })
      .catch(error => {
        if (!error.response) return;
        const { status } = error.response;
        setLendResult(false);
        setMiniModalContents(
          status === 400
            ? getErrorMessage("lendings", error.response.data.errorCode)
            : error.message,
        );
      });
  };

  return (
    <div className="modal__wrapper mid">
      <div className="mid-modal__cover">
        <img
          src={reservedInfo.book.info.image}
          alt="cover"
          className="mid-modal__cover-img"
        />
      </div>
      <div className="mid-modal__detail">
        <div className="mid-modal__book">
          <p className="font-16 color-red">도서정보</p>
          <p className="mid-modal__book-title font-28-bold color-54  margin-8">
            {reservedInfo.book.info.title}
          </p>
          <p className="font-16 color-54">{`도서코드 : ${reservedInfo.book.callSign}`}</p>
        </div>
        <div className="mid-modal__lend">
          <p className="font-16 color-red">예약 만료일</p>
          <p className="font-28-bold color-54  margin-8">
            {reservedInfo.endAt ? reservedInfo.endAt.slice(0, 10) : "NULL"}
          </p>
        </div>
        <div className="mid-modal__user">
          <p className="font-16 color-red">유저정보</p>
          <p className="font-28-bold color-54  margin-8">
            {reservedInfo.user.login}
          </p>
          <p className="font-16 color-54">{`연체일수 : ${reservedInfo.user.penaltyDays}`}</p>
        </div>
        <div className="mid-modal__remark">
          <p className="font-16 color-red">비고</p>
          <textarea
            className="mid-modal__remark__input margin-8"
            placeholder="비고를 입력해주세요. (반납 시 책 상태 등)"
            value={remark}
            onChange={handleRemark}
          />
          <div className="modal__buttons">
            <button
              className={`modal__button mid font-20 color-ff ${
                remark && `confirm`
              }`}
              type="button"
              onClick={postData}
            >
              대출 완료하기
            </button>
            <button
              className="modal__button mid font-20 color-ff"
              type="button"
              onClick={closeModal}
            >
              취소하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ReservedModalContents.propTypes = {
  closeModal: PropTypes.func.isRequired,
  reservedInfo: PropTypes.object.isRequired,
  setMiniModalContents: PropTypes.func.isRequired,
  setLendResult: PropTypes.func.isRequired,
};

export default ReservedModalContents;
