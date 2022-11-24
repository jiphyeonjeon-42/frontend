/* eslint-disable react/prop-types */
import React from "react";
import Image from "../utils/Image";
import Arr from "../../img/arrow_right_black.svg";
import "../../css/HistoryTable.css";

const HistoryTable = ({ factor }) => {
  return (
    <div className="histories__table-list">
      <button className="histories__table-list__button" type="button">
        <div className="histories__table-list__title">
          <span className="histories__table-list__text color-54">
            {factor?.title}
          </span>
          <span className="histories-callSign font-16 color-54">
            도서등록번호 : {factor?.callSign}
          </span>
          <Image className="histories__table-list__arr" src={Arr} alt="arrow" />
        </div>
        <div className="histories__table-list__info">
          <span> 대출일 : {factor?.createdAt} </span>
          <span> 대출사서 : {factor?.lendingLibrarianNickName} </span>
          <span> 대출당시상태 : {factor?.lendingCondition} </span>
          <span> 대출자 : {factor?.login} </span>
        </div>
        {factor?.returnedAt && (
          <div className="histories__table-list__info">
            <span> 반납일 : {factor?.returnedAt} </span>
            <span> 반납사서 : {factor?.returningLibrarianNickname} </span>
            <span> 반납당시상태 : {factor?.returningCondition} </span>
          </div>
        )}
      </button>
    </div>
  );
};

export default HistoryTable;

HistoryTable.propTypes = {};
