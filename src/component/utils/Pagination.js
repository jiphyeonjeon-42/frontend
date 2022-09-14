import React from "react";
import PropTypes from "prop-types";
import ArrRight from "../../img/arrow_right_black.svg";
import ArrRightDouble from "../../img/arrow_right_black_double.svg";
import "../../css/Pagination.css";

const COUNT = 5;

const Pagination = ({ page, setPage, lastPage }) => {
  const startNum = Math.floor((page - 1) / COUNT) * COUNT + 1;
  const pageRange = [];
  for (let i = 0; i < COUNT; i += 1) {
    if (startNum + i <= lastPage) pageRange.push(startNum + i);
  }
  const isPrevAvailable = startNum > 1;
  const isNextAvailable = startNum <= lastPage - COUNT;

  const changePage = e => {
    const { value } = e.currentTarget;
    setPage(parseInt(value, 10));
  };

  const changePageRange = e => {
    const type = e.currentTarget.value;
    if (type === "previous" && startNum > COUNT + 1) setPage(startNum - COUNT);
    else if (type.includes("prev")) setPage(1);
    else if (type === "next" && startNum + COUNT < lastPage)
      setPage(startNum + COUNT);
    else if (type.includes("next")) setPage(lastPage);
  };

  return (
    <div className="pagination">
      {/* 왼쪽으로 넘기기 버튼 */}
      <div className="pagination__page-ranges">
        {isPrevAvailable && (
          <>
            <button
              type="button"
              className="pagination__page-range-button double reverse"
              value="previousStart"
              onClick={changePageRange}
            >
              <img
                className="reverse double"
                src={ArrRightDouble}
                alt="go to first page range"
              />
            </button>
            <button
              className="pagination__page-range-button reverse"
              type="button"
              value="previous"
              onClick={changePageRange}
            >
              <img
                className="reverse"
                src={ArrRight}
                alt="go to previous page range"
              />
            </button>
          </>
        )}
      </div>
      {/* 페이지 번호 */}
      <div className="pagination__pages">
        {pageRange.map(pageNum => (
          <button
            type="button"
            key={pageNum}
            value={pageNum}
            onClick={changePage}
            className={`pagination__page-button font-20 ${
              page === pageNum ? "color-54" : "color-a4"
            }`}
          >
            {pageNum}
          </button>
        ))}
      </div>

      {/* 오른쪽으로 넘기기 버튼 */}
      <div className="pagination__page-ranges">
        {isNextAvailable && (
          <>
            <button
              type="button"
              className="pagination__page-range-button"
              value="next"
              onClick={changePageRange}
            >
              <img src={ArrRight} alt="go to next page range" />
            </button>
            <button
              className="pagination__page-range-button double"
              type="button"
              value="nextLast"
              onClick={changePageRange}
            >
              <img
                className="double"
                src={ArrRightDouble}
                alt="go to last page range"
              />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Pagination;

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  lastPage: PropTypes.number.isRequired,
};
