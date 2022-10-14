import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import Button from "../utils/Button";
import BookInformationWithCover from "../utils/BookInformationWithCover";
import TextWithLabel from "../utils/TextWithLabel";
import TextareaWithLabel from "../utils/TextareaWithLabel";
import getErrorMessage from "../../data/error";
import "../../css/RentModalConfirm.css";

const RentModalConfirm = ({
  selectedUser,
  selectedBooks,
  closeModal,
  openDialog,
  setFirstBookContests,
  setSecondBookContests,
}) => {
  const navigate = useNavigate();
  const [remark1, setRemark1] = useState("");
  const [remark2, setRemark2] = useState("");

  const handleRemark1 = e => {
    e.preventDefault();
    setRemark1(e.target.value);
  };

  console.log(selectedBooks);

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
          openDialog();
        })
        .catch(error => {
          const { errorCode } = error.response.data;
          if (errorCode === 100) navigate("/");
          if ([101, 102, 108, 109].includes(errorCode)) navigate("/logout");
          const errMsg = `${
            selectedBooks[i].title
          } - 대출 실패\n(사유 : ${getErrorMessage(errorCode)})\n\n`;
          if (i === 0) setFirstBookContests(errMsg);
          else setSecondBookContests(errMsg);
          openDialog();
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
    closeModal();
  };

  const isRentable =
    (selectedBooks.length === 1 && remark1) ||
    (selectedBooks.length === 2 && remark1 && remark2);

  return (
    <div className="rent-modal">
      <div className="rent-modal__user">
        <p className="font-16 color-red">유저정보</p>
        <div className="rent-modal__user__detail">
          <p className="rent-modal__user__id font-28-bold color-54">
            {selectedUser.nickname ? selectedUser.nickname : selectedUser.email}
          </p>
          <p className="font-16 color-54">{`현재 대출권수 ( ${selectedUser.lendings.length} / 2 )`}</p>
        </div>
      </div>
      <div className="rent-modal__books">
        {selectedBooks.map((selectBook, index) => (
          <div
            key={selectBook.id}
            className={`rent-modal__book-info ${
              index === 0 ? "" : "second-book"
            }`}
          >
            <BookInformationWithCover
              bookCoverAlt={selectBook.title}
              bookCoverImg={selectBook.image}
            >
              <TextWithLabel
                wrapperClassName="rent-modal__book"
                topLabelText="도서정보"
                mainText={selectBook.title}
                bottomLabelText={`청구기호 : ${selectBook.callSign}`}
              />
              <TextareaWithLabel
                wrapperClassName="rent-modal__remark"
                topLabelText="비고"
                textareaPlaceHolder="비고를 입력해주세요. (책 상태 등)"
                textareaValue={index === 0 ? remark1 : remark2}
                onChangeTextarea={index === 0 ? handleRemark1 : handleRemark2}
                isTextareaFocusedOnMount={index === 0}
              />
            </BookInformationWithCover>
          </div>
        ))}
      </div>
      <div className="rent-modal__buttons">
        <Button
          value="대출 완료하기"
          onClick={postData}
          disabled={isRentable}
          className={`${isRentable && `confirm`}`}
        />
        <Button
          value="취소하기"
          className="rent-modal__cancel"
          onClick={closeModal}
        />
      </div>
    </div>
  );
};

export default RentModalConfirm;

RentModalConfirm.propTypes = {
  closeModal: PropTypes.func.isRequired,
  openDialog: PropTypes.func.isRequired,
  // setRentResult: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  selectedUser: PropTypes.object.isRequired,
  selectedBooks: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  setFirstBookContests: PropTypes.func.isRequired,
  setSecondBookContests: PropTypes.func.isRequired,
};
