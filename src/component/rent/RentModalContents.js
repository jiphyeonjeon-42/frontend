import React, { useState } from "react";
import PropTypes from "prop-types";
import "../../css/RentModal.css";
import axios from "axios";
import getErrorMessage from "../utils/error";

const RentModalContents = ({
  selectUser,
  selectBooks,
  closeModal,
  setMiniModalContents,
  setLendResult,
}) => {
  const [remark1, setRemark1] = useState("");
  const [remark2, setRemark2] = useState("");

  const handleRemark1 = e => {
    e.preventDefault();
    setRemark1(e.target.value);
  };

  const handleRemark2 = e => {
    e.preventDefault();
    setRemark2(e.target.value);
  };

  const postData = async () => {
    const data =
      selectBooks.length === 1
        ? [
            {
              userId: selectUser.id,
              bookId: selectBooks[0].id,
              condition: remark1,
            },
          ]
        : [
            {
              userId: selectUser.id,
              bookId: selectBooks[0].id,
              condition: remark1,
            },
            {
              userId: selectUser.id,
              bookId: selectBooks[1].id,
              condition: remark2,
            },
          ];
    setRemark1("");
    setRemark2("");
    await axios
      .post(`${process.env.REACT_APP_API}/lendings`, data)
      .then(() => {
        setMiniModalContents("success");
        setLendResult(true);
      })
      .catch(error => {
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
      <div className="rent-modal__user">
        <p className="font-16 color-red">유저정보</p>
        <span className="rent-modal__user__id font-28-bold color-54 margin-8">
          {selectUser.login}
        </span>
        <span className="font-16 color-54">{`현재 대출권수 ( ${selectUser.lendingCnt} / 2 )`}</span>
      </div>
      <div className="rent-modal__books">
        {selectBooks.map((selectBook, index) => (
          <div
            className={`rent-modal__book-info ${
              index === 0 ? "" : "second-book"
            }`}
          >
            <div className="rent-modal__cover">
              <img
                src={selectBook.info.image}
                alt="cover"
                className="rent-modal__cover-img"
              />
            </div>
            <div className="rent-modal__detail">
              <div className="mid-modal__book">
                <p className="font-16 color-red">도서정보</p>
                <p className="rent-modal__title font-28-bold color-54 margin-8">
                  {selectBook.info.title}
                </p>
                <p className="font-16 color-54">{`도서코드 : ${selectBook.callSign}`}</p>
              </div>
              <div className="rent-modal__remark">
                <p className="font-16 color-red">비고</p>
                <textarea
                  className="mid-modal__remark__input margin-8"
                  placeholder="비고를 입력해주세요. (반납 시 책 상태 등)"
                  value={index === 0 ? remark1 : remark2}
                  onChange={index === 0 ? handleRemark1 : handleRemark2}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="rent-modal__button">
        <button
          className={`modal__button mid font-20 color-ff ${
            ((selectBooks.length === 2 && remark1 && remark2) ||
              (selectBooks.length === 1 && remark1)) &&
            `confirm`
          }`}
          type="button"
          disabled={
            (selectBooks.length === 2 && remark1 && remark2) ||
            (selectBooks.length === 1 && remark1)
              ? ""
              : "disabled"
          }
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
  );
};

export default RentModalContents;

RentModalContents.propTypes = {
  closeModal: PropTypes.func.isRequired,
  setMiniModalContents: PropTypes.func.isRequired,
  setLendResult: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  selectUser: PropTypes.object.isRequired,
  selectBooks: PropTypes.arrayOf(PropTypes.object).isRequired,
};