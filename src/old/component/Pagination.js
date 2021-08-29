import React from "react";
// import { atom, useRecoilState } from "recoil";
import { atom, useRecoilState, useSetRecoilState } from "recoil";
// import { useHistory } from "react-router-dom";
// eslint-disable-next-line import/no-cycle
import { currentPage } from "./Books";
import "../css/Pagination.css";

export const pageRangeState = atom({
  key: "pageRangeState",
  default: 0,
});

// const setHistory = pageNum => {
//   // eslint-disable-next-line prefer-const
//   let history = useHistory();
//   history.push(`/page/${pageNum}`);
//   return { history };
// };

// eslint-disable-next-line react/prop-types
const PageButton = ({ pageNum }) => {
  const setPage = useSetRecoilState(currentPage);
  const changePage = () => {
    const currentButton = document.getElementById(`page${pageNum}`);
    setPage(currentButton.innerHTML);
    console.log(currentButton.innerHTML);
  };
  return (
    <button type="button" onClick={changePage} id={`page${pageNum}`}>
      {pageNum}
    </button>
  );
};

// eslint-disable-next-line react/prop-types
const PrePageButton = ({ pageRange, setPageRange }) => {
  const changePage = () => {
    if (pageRange > 0) {
      setPageRange(pageRange - 1);
    }
  };
  return <button type="button" onClick={changePage}>{`<<`}</button>;
};

// eslint-disable-next-line react/prop-types
const NextPageButton = ({ pageRange, setPageRange }) => {
  const changePage = () => {
    if (pageRange >= 0) {
      setPageRange(pageRange + 1);
    }
  };
  return <button type="button" onClick={changePage}>{`>>`}</button>;
};

const Pagination = () => {
  const [pageRange, setPageRange] = useRecoilState(pageRangeState);
  const pageRangeArr = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= 5; i++) {
    pageRangeArr.push(pageRange * 5 + i);
  }
  console.log(pageRangeArr);
  return (
    <div className="pagination">
      <PrePageButton pageRange={pageRange} setPageRange={setPageRange} />
      {pageRangeArr.map(n => (
        <PageButton pageNum={n} />
      ))}
      <NextPageButton pageRange={pageRange} setPageRange={setPageRange} />
    </div>
  );
};

export default Pagination;
