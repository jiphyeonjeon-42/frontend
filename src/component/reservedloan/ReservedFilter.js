/* eslint-disable react/prop-types */
import React from "react";
import "../../css/ReservedFilter.css";
import CheckIcon from "../../img/check_icon.svg";
import RedCheckIcon from "../../img/check_icon_red.svg";

const ReservedFilter = ({
  isPending,
  setIsPending,
  isExpired,
  setIsExpired,
  isWaiting,
  setIsWaiting,
}) => {
  const toggleProceeding = () => {
    setIsPending(!isPending);
    setIsWaiting(false);
    setIsExpired(false);
  };
  const toggleWaiting = () => {
    setIsPending(false);
    setIsWaiting(!isWaiting);
    setIsExpired(false);
  };
  const toggleFinish = () => {
    setIsPending(false);
    setIsWaiting(false);
    setIsExpired(!isExpired);
  };
  return (
    <div className="reserved-filter">
      <div className="reserved-filter-wrapper">
        <button
          type="button"
          onClick={toggleProceeding}
          className="proceeding filter-button"
        >
          <img
            className="filter__icon"
            src={`${isPending ? RedCheckIcon : CheckIcon}`}
            alt="check"
          />
          <span
            className={`proceeding-finsh__text font-16-bold ${
              isPending ? "color-red" : "color-a4"
            }`}
          >
            예약 0순위
          </span>
        </button>
        <button
          type="button"
          onClick={toggleWaiting}
          className="finish filter-button"
        >
          <img
            className="filter__icon"
            src={`${isWaiting ? RedCheckIcon : CheckIcon}`}
            alt="check"
          />
          <span
            className={`proceeding-finish__text font-16-bold ${
              isWaiting ? "color-red" : "color-a4"
            }`}
          >
            예약 후순위
          </span>
        </button>
        <button
          type="button"
          onClick={toggleFinish}
          className=" finish filter-button "
        >
          <img
            className="filter__icon"
            src={`${isExpired ? RedCheckIcon : CheckIcon}`}
            alt="check"
          />
          <span
            className={`proceeding-finish__text font-16-bold ${
              isExpired ? "color-red" : "color-a4"
            }`}
          >
            종료된 예약
          </span>
        </button>
      </div>
    </div>
  );
};

export default ReservedFilter;
