import React from "react";
import PropTypes from "prop-types";
import ArrRight from "../../img/arrow_right_black.svg";
import "../../css/Pagination.css";

const Pagination = ({
  userPage,
  setUserPage,
  pageRange,
  setPageRange,
  lastPage,
}) => {
  const pageRangeArr = [];

  for (let i = 1; i <= 5; i += 1) {
    if (pageRange * 5 + i <= lastPage) pageRangeArr.push(pageRange * 5 + i);
  }
  const changePage = e => {
    const { value } = e.currentTarget;
    setUserPage(parseInt(value, 10));
  };

  const changPageRange = e => {
    const type = e.currentTarget.value;
    if (type === "prev" && pageRange > 0) {
      setPageRange(pageRange - 1);
    } else if (type === "next" && (pageRange + 1) * 5 < parseInt(lastPage, 10))
      setPageRange(pageRange + 1);
  };
  return (
    <div className="admin-pagination">
      <button
        className="pre-page-button"
        type="button"
        value="prev"
        onClick={changPageRange}
      >
        {pageRange > 0 && (
          <img
            className="page-button-icon-reverse"
            src={ArrRight}
            alt="prePage"
          />
        )}
      </button>
      {pageRangeArr.map(pageNum => (
        <button
          key={pageNum}
          type="button"
          value={pageNum}
          onClick={changePage}
          className={`page-button font-20 ${
            userPage === pageNum ? "color-54" : "color-a4"
          }`}
        >
          {pageNum}
        </button>
      ))}
      <button
        className="next-page-button"
        type="button"
        value="next"
        onClick={changPageRange}
      >
        {(pageRange + 1) * 5 < parseInt(lastPage, 10) && (
          <img className="page-button-icon" src={ArrRight} alt="nextPage" />
        )}
      </button>
    </div>
  );
};

export default Pagination;

Pagination.propTypes = {
  userPage: PropTypes.number.isRequired,
  setUserPage: PropTypes.func.isRequired,
  pageRange: PropTypes.number.isRequired,
  setPageRange: PropTypes.func.isRequired,
  lastPage: PropTypes.number.isRequired,
};
