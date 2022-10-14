import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import BookInformationWithCover from "../utils/BookInformationWithCover";
import TextWithLabel from "../utils/TextWithLabel";
import TextareaWithLabel from "../utils/TextareaWithLabel";
import Button from "../utils/Button";
import getErrorMessage from "../../data/error";
import "../../css/ReturnModalContents.css";

const ReturnModalContents = ({
  lendingId,
  closeModal,
  setDialogTitleAndMessage,
  openDialog,
}) => {
  const defaultData = {
    id: null,
    condition: "",
    createdAt: "",
    login: "",
    penaltyDays: null,
    callSign: "",
    title: "",
    image: "",
    dueDate: "",
  };
  const [data, setData] = useState(defaultData);
  const [remark, setRemark] = useState("");
  const [remarkMessage, setRemarkMessage] = useState("");

  const handleRemark = e => {
    e.preventDefault();
    setRemark(e.target.value);
  };
  useEffect(async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/lendings/${lendingId}`)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        const errorCode = parseInt(error?.response?.data?.errorCode, 10);
        const [title, message] = getErrorMessage(errorCode).split("\r\n");
        setDialogTitleAndMessage(title, message);
        openDialog();
      });
  }, []);

  const postReturn = async () => {
    if (!remark) return;
    const condition = remark;
    setRemark("");
    await axios
      .patch(`${process.env.REACT_APP_API}/lendings/return`, {
        lendingId,
        condition,
      })
      .then(res => {
        setDialogTitleAndMessage(
          `${data.title} \n ${
            res.data?.reservedBook
              ? "예약된 책입니다. 예약자를 위해 따로 보관해주세요."
              : ""
          }`,
        );
        openDialog();
      })
      .catch(error => {
        const errorCode = parseInt(error?.response?.data?.errorCode, 10);
        const [title, message] = getErrorMessage(errorCode).split("\r\n");
        setDialogTitleAndMessage(title, message);
        openDialog();
      });
  };
  const onClickReturn = () => {
    if (remark.length) postReturn();
    setRemarkMessage("비고를 입력해주세요");
  };
  return (
    <BookInformationWithCover
      wrapperClassName="return-modal__wrapper"
      bookCoverImg={data.image}
      bookCoverAlt={data.title}
    >
      <TextWithLabel
        wrapperClassName="return-modal__book"
        topLabelText="도서정보"
        mainText={data.title}
        bottomLabelText={`청구기호 : ${data.callSign}`}
      />
      <TextWithLabel
        wrapperClassName="return-modal__lend"
        topLabelText="대출정보"
        mainText={data.createdAt.replaceAll(".", "-")}
        bottomLabelText={`반납예정일 : ${data.dueDate.replaceAll(".", "-")}`}
      />
      <TextWithLabel
        topLabelText="유저정보"
        mainText={data.login}
        bottomLabelText={`연체일수 : ${data.penaltyDays}일`}
      />
      <TextareaWithLabel
        wrapperClassName="return-modal__remark"
        topLabelText="비고"
        textareaValue={remark}
        onChangeTextarea={handleRemark}
        textareaPlaceHolder={`대출당시 : ${data.lendingCondition}`}
        bottomMessageText={remarkMessage}
      />
      <div className="return-modal__buttons">
        <Button
          value="반납 완료하기"
          color={`${remark.length && "red"}`}
          disabled={remark.length === 0}
          onClick={onClickReturn}
        />
        <Button
          value="취소하기"
          className="return-modal__cancel"
          onClick={closeModal}
        />
      </div>
    </BookInformationWithCover>
  );
};

export default ReturnModalContents;

ReturnModalContents.propTypes = {
  lendingId: PropTypes.number.isRequired,
  closeModal: PropTypes.func.isRequired,
  setDialogTitleAndMessage: PropTypes.func.isRequired,
  openDialog: PropTypes.func.isRequired,
};
