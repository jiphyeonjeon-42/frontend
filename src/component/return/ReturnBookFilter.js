/* eslint-disable react/prop-types */
import React from "react";
import "../../css/ReturnBookFilter.css";

const ReturnBookFilter = ({ lendingSort, setLendingSort }) => {
  const toggleTrue = () => {
    setLendingSort(true);
  };
  const toggleFalse = () => {
    setLendingSort(false);
  };
  return (
    <div className="return-filter">
      <div className="return-filter-wrapper">
        <button
          type="button"
          onClick={toggleTrue}
          className="proceeding filter-button"
        >
          <span
            className={`proceeding-finsh__text ${
              lendingSort ? "font-16-bold color-54" : "font-16 color-a4"
            }`}
          >
            연체순
          </span>
        </button>
        <button
          type="button"
          onClick={toggleFalse}
          className="finish filter-button"
        >
          <span
            className={`proceeding-finsh__text ${
              lendingSort ? "font-16 color-a4" : "font-16-bold color-54"
            }`}
          >
            최신순
          </span>
        </button>
      </div>
    </div>
  );
};

export default ReturnBookFilter;
