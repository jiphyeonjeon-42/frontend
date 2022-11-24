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
          대출자 : {factor?.login} 대출일 : {factor?.createdAt} 대출사서 :
          {factor?.lendingLibrarianNickName} 대출당시상태 :
          {factor?.lendingCondition}
        </div>
        {factor?.returnedAt && (
          <div className="histories__table-list__info">
            반납일 : {factor?.returnedAt} 반납사서 :
            {factor?.returningLibrarianNickname} 반납당시상태 :
            {factor?.returningCondition}
          </div>
        )}
      </button>
    </div>
  );
};

export default HistoryTable;

HistoryTable.propTypes = {};
