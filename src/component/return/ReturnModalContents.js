import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import getErrorMessage from "../utils/error";

const ReturnModalContents = ({
  lendingId,
  closeModal,
  setMiniModalContents,
  setReturnResult,
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

  const handleRemark = e => {
    e.preventDefault();
    setRemark(e.target.value);
  };
  useEffect(async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/lendings/${lendingId}`)
      .then(response => {
        setData(response.data);
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
      .then(() => {
        setMiniModalContents(data.title);
        setReturnResult(true);
      })
      .catch(error => {
        setReturnResult(false);
        const { status } = error.response;

        setMiniModalContents(
          status === 400
            ? getErrorMessage("return", error.response.data.errorCode)
            : error.message,
        );
      });
  };

  return (
    <div className="modal__wrapper mid">
      <div className="mid-modal__cover">
        <img src={data.image} alt="cover" className="mid-modal__cover-img" />
      </div>
      <div className="mid-modal__detail">
        <div className="mid-modal__book">
          <p className="font-16 color-red">도서정보</p>
          <p className="mid-modal__book-title font-28-bold color-54  margin-8">
            {data.title}
          </p>
          <p className="font-16 color-54">{`도서코드 : ${data.callSign}`}</p>
        </div>
        <div className="mid-modal__lend">
          <p className="font-16 color-red">대출정보</p>
          <p className="font-28-bold color-54  margin-8">{data.createdAt}</p>
          <p className="font-16 color-54">{`반납예정일 : ${data.dueDate}`}</p>
        </div>
        <div className="mid-modal__user">
          <p className="font-16 color-red">유저정보</p>
          <p className="font-28-bold color-54  margin-8">{data.login}</p>
          <p className="font-16 color-54">{`연체일수 : ${data.penaltyDays}일`}</p>
        </div>
        <div className="mid-modal__remark">
          <p className="font-16 color-red">비고</p>
          <textarea
            className="mid-modal__remark__input margin-8 font-16"
            placeholder={`대출당시 : ${data.lendingCondition}`}
            value={remark}
            onChange={handleRemark}
          />
          <div className="modal__buttons">
            <button
              className={`modal__button mid font-20 color-ff ${
                remark && `confirm`
              }`}
              type="button"
              onClick={postReturn}
            >
              반납 완료하기
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

export default ReturnModalContents;

ReturnModalContents.propTypes = {
  lendingId: PropTypes.number.isRequired,
  closeModal: PropTypes.func.isRequired,
  setMiniModalContents: PropTypes.func.isRequired,
  setReturnResult: PropTypes.func.isRequired,
};
