import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "../../css/RentModalConfirm.css";
import { useHistory } from "react-router-dom";
import getErrorMessage from "../utils/error";
import IMGERR from "../../img/image_onerror.svg";

const RentModalConfirm = ({
  selectedUser,
  selectedBooks,
  closeModal,
  setMiniModalContents,
  setFirstBookContests,
  setSecondBookContests,
}) => {
  const history = useHistory();
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

  const makeLending = book => {
    const date = new Date();
    date.setDate(date.getDate() + 14);
    // eslint-disable-next-line no-param-reassign
    book.duedate = date;
    return book;
  };

  function subtituteImg(e) {
    e.target.src = IMGERR;
  }

  const axiosPost = async data => {
    for (let i = 0; i < data.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await axios
        .post(`${process.env.REACT_APP_API}/lendings`, data[i])
        .then(() => {
          const msg = `${selectedBooks[i].title} - 대출완료\n\n`;
          if (i === 0) setFirstBookContests(msg);
          else setSecondBookContests(msg);
          selectedUser.lendings.push(makeLending(selectedBooks[i]));
        })
        .catch(error => {
          const { errorCode } = error.response.data;
          if (errorCode === 100) history.push("/");
          if ([101, 102, 108, 109].includes(errorCode)) history.push("/logout");
          const errMsg = `${
            selectedBooks[i].title
          } - 대출 실패\n(사유 : ${getErrorMessage(
            "lendings",
            errorCode,
          )})\n\n`;
          if (i === 0) setFirstBookContests(errMsg);
          else setSecondBookContests(errMsg);
        });
    }
  };

  const postData = async () => {
    const data =
      selectedBooks.length === 1
        ? [
            {
              userId: selectedUser.id,
              bookId: selectedBooks[0].id,
              condition: remark1,
            },
          ]
        : [
            {
              userId: selectedUser.id,
              bookId: selectedBooks[0].id,
              condition: remark1,
            },
            {
              userId: selectedUser.id,
              bookId: selectedBooks[1].id,
              condition: remark2,
            },
          ];
    await axiosPost(data);
    while (selectedBooks.length !== 0) selectedBooks.pop();
    setRemark1("");
    setRemark2("");
    setMiniModalContents(true);
    closeModal();
  };
  return (
    <div className="modal__wrapper rent-modal">
      <div className="rent-modal__user">
        <p className="font-16 color-red">유저정보</p>
        <span className="rent-modal__user__id font-28-bold color-54 margin-8">
          {selectedUser.nickname ? selectedUser.nickname : selectedUser.email}
        </span>
        <span className="font-16 color-54">{`현재 대출권수 ( ${selectedUser.lendings.length} / 2 )`}</span>
      </div>
      <div className="rent-modal__books">
        {selectedBooks.map((selectBook, index) => (
          <div
            key={selectBook.id}
            className={`rent-modal__book-info ${
              index === 0 ? "" : "second-book"
            }`}
          >
            <div className="rent-modal__cover">
              <img
                src={selectBook.image}
                alt="cover"
                className="rent-modal__cover-img"
                onError={subtituteImg}
              />
            </div>
            <div className="rent-modal__detail">
              <div className="mid-modal__book">
                <p className="font-16 color-red">도서정보</p>
                <p className="rent-modal__title font-28-bold color-54 margin-8">
                  {selectBook.title}
                </p>
                <p className="font-16 color-54">{`도서코드 : ${selectBook.callSign}`}</p>
              </div>
              <div className="rent-modal__remark">
                <p className="font-16 color-red">비고</p>
                <textarea
                  className="mid-modal__remark__input margin-8 font-16"
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
            ((selectedBooks.length === 2 && remark1 && remark2) ||
              (selectedBooks.length === 1 && remark1)) &&
            `confirm`
          }`}
          type="button"
          disabled={
            (selectedBooks.length === 2 && remark1 && remark2) ||
            (selectedBooks.length === 1 && remark1)
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

export default RentModalConfirm;

RentModalConfirm.propTypes = {
  closeModal: PropTypes.func.isRequired,
  setMiniModalContents: PropTypes.func.isRequired,
  // setRentResult: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  selectedUser: PropTypes.object.isRequired,
  selectedBooks: PropTypes.arrayOf(PropTypes.object).isRequired,
  setFirstBookContests: PropTypes.func.isRequired,
  setSecondBookContests: PropTypes.func.isRequired,
};
