/* eslint-disable react/prop-types */
import React from "react";
import Image from "../utils/Image";
import Arr from "../../img/arrow_right_black.svg";
import "../../css/HistoryTable.css";

const HistoryTable = ({ factor }) => {
  return (
    <div className="histories__table-list">
      <span className="histories__table-list__name font-16-bold color-54">
        {factor?.login}
      </span>
      <button className="histories__table-list__button" type="button">
        <div className="histories__table-list__title color-54">
          {factor?.title}
          <span className="histories-callSign font-16 color-54">
            {factor?.callSign}
          </span>
          <Image className="histories__table-list__arr" src={Arr} alt="arrow" />
        </div>
        <div className="histories__table-list_date_wrapper">
          <div className="histories__table-list__info color-54">
            대출정보 :
            <span className="histories__table-list__text">
              {factor?.createdAt}
            </span>
            <span className="histories__table-list__text">
              {factor?.lendingLibrarianNickName}
            </span>
            <span className="histories__table-list__text">
              {factor?.lendingCondition}
            </span>
          </div>
          {factor?.returnedAt && (
            <div className="histories__table-list__info color-54">
              반납정보 :
              <span className="histoies__table-list__text">
                {factor?.returnedAt}
              </span>
              <span className="histoies__table-list__text">
                {factor?.returningLibrarianNickname}
              </span>
              <span className="histoies__table-list__text">
                {factor?.returningCondition}
              </span>
            </div>
          )}
        </div>
      </button>
    </div>
  );
};

export default HistoryTable;

HistoryTable.propTypes = {};
