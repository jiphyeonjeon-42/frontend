/* eslint-disable react/prop-types */
import React from "react";
import { atom, useRecoilState } from "recoil";
import { useHistory } from "react-router-dom";
// import ArrLeft from "../img/arrow_left_black.svg";
import ArrRight from "../img/arrow_right_black.svg";
import "../css/Pagination.css";

export const pageRangeState = atom({
  key: "pageRangeState",
  default: 0,
});

const PageButton = ({ pageNum, current }) => {
  // eslint-disable-next-line prefer-const
  let history = useHistory();
  const changePage = () => {
    const currentButton = document.getElementById(`page${pageNum}`).innerHTML;
    history.push(`?${currentButton}`);
  };

  return (
    <button
      type="button"
      onClick={changePage}
      className={`page-button font-20 ${
        parseInt(current, 10) === pageNum ? "color-54" : "color-a4"
      }`}
      id={`page${pageNum}`}
    >
      {pageNum}
    </button>
  );
};

const PrePageButton = ({ pageRange, setPageRange }) => {
  const changePage = () => {
    if (pageRange > 0) {
      setPageRange(pageRange - 1);
    }
  };
  return (
    <button className="pre-page-button" type="button" onClick={changePage}>
      {pageRange > 0 ? (
        <img
          className="page-button-icon-reverse"
          src={ArrRight}
          alt="prePage"
        />
      ) : (
        <span className="page-button-icon" />
      )}
    </button>
  );
};

const NextPageButton = ({ pageRange, setPageRange }) => {
  const changePage = () => {
    if (pageRange >= 0) {
      setPageRange(pageRange + 1);
    }
  };
  return (
    <button className="next-page-button" type="button" onClick={changePage}>
      <img className="page-button-icon" src={ArrRight} alt="nextPage" />
    </button>
  );
};

const Pagination = ({ current }) => {
  const [pageRange, setPageRange] = useRecoilState(pageRangeState);
  const pageRangeArr = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= 5; i++) {
    pageRangeArr.push(pageRange * 5 + i);
  }

  return (
    <div className="pagination">
      <PrePageButton pageRange={pageRange} setPageRange={setPageRange} />
      {pageRangeArr.map(n => (
        <PageButton pageNum={n} current={current} />
      ))}
      <NextPageButton pageRange={pageRange} setPageRange={setPageRange} />
    </div>
  );
};

export default Pagination;
