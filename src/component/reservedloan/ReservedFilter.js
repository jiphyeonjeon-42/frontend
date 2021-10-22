import React, { useState } from "react";
import "../../css/ReservedFilter.css";
import CheckIcon from "../../img/check_icon.svg";
import RedCheckIcon from "../../img/check_icon_red.svg";

const ReservedFilter = () => {
  const [isProceeding, setProceeding] = useState(false);
  const [isFinish, setFinish] = useState(false);
  const toggleProceeding = () => {
    setProceeding(!isProceeding);
  };
  const toggleFinish = () => {
    setFinish(!isFinish);
  };
  return (
    <div className="reserved-filter">
      <div className="reserved-filter-wrapper">
        <button type="button" onClick={toggleProceeding} className="proceeding">
          <img
            className="filter__icon"
            src={`${isProceeding ? RedCheckIcon : CheckIcon}`}
            alt="check"
          />
          <span
            className={`proceeding-finsh__text font-16-bold ${
              isProceeding ? "color-red" : "color-a4"
            }`}
          >
            진행중 예약 보기
          </span>
        </button>
        <button type="button" onClick={toggleFinish} className="finish">
          <img
            className="filter__icon"
            src={`${isFinish ? RedCheckIcon : CheckIcon}`}
            alt="check"
          />
          <span
            className={`proceeding-finish__text font-16-bold ${
              isFinish ? "color-red" : "color-a4"
            }`}
          >
            종료된 예약 보기
          </span>
        </button>
      </div>
    </div>
  );
};

export default ReservedFilter;
