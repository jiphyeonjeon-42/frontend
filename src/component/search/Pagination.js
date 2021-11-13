import React from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import ArrRight from "../../img/arrow_right_black.svg";
import "../../css/Pagination.css";

const PageButton = ({
  userWord,
  userPage,
  userSort,
  userCateIndex,
  pageNum,
  myRef,
}) => {
  // eslint-disable-next-line prefer-const
  let history = useHistory();

  const changePage = () => {
    history.push(
      `?string=${userWord}&page=${pageNum}&category=${userCateIndex}&sort=${userSort}`,
    );
    // 페이지 전환시 돔이 참조하고 있는 곳으로 현재 스크롤 이동
    myRef.current.scrollIntoView();
  };

  return (
    <button
      type="button"
      onClick={changePage}
      className={`page-button font-20 ${
        parseInt(userPage, 10) === pageNum ? "color-54" : "color-a4"
      }`}
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

const NextPageButton = ({ pageRange, setPageRange, lastPage }) => {
  const changePage = () => {
    if ((pageRange + 1) * 5 < parseInt(lastPage, 10)) {
      setPageRange(pageRange + 1);
    }
  };
  return (
    <button className="next-page-button" type="button" onClick={changePage}>
      {(pageRange + 1) * 5 < parseInt(lastPage, 10) ? (
        <img className="page-button-icon" src={ArrRight} alt="nextPage" />
      ) : (
        <span className="page-button-icon" />
      )}
    </button>
  );
};

const Pagination = ({
  userWord,
  pageRange,
  setPageRange,
  lastPage,
  userPage,
  userSort,
  userCateIndex,
  myRef,
}) => {
  const pageRangeArr = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= 5; i++) {
    if (pageRange * 5 + i <= lastPage) pageRangeArr.push(pageRange * 5 + i);
  }

  return (
    <div className="pagination">
      <PrePageButton
        pageRange={pageRange}
        setPageRange={setPageRange}
        lastPage={lastPage}
      />
      {pageRangeArr.map(n => (
        <PageButton
          key={n}
          pageNum={n}
          userWord={userWord}
          userPage={userPage}
          userSort={userSort}
          userCateIndex={userCateIndex}
          myRef={myRef}
        />
      ))}
      <NextPageButton
        pageRange={pageRange}
        setPageRange={setPageRange}
        lastPage={lastPage}
      />
    </div>
  );
};

PageButton.propTypes = {
  myRef: PropTypes.oneOfType([
    PropTypes.func,
    // eslint-disable-next-line react/forbid-prop-types
    PropTypes.shape({ current: PropTypes.any }),
  ]).isRequired,
  userWord: PropTypes.string.isRequired,
  pageNum: PropTypes.number.isRequired,
  userPage: PropTypes.number.isRequired,
  userSort: PropTypes.string.isRequired,
  userCateIndex: PropTypes.number.isRequired,
};
PrePageButton.propTypes = {
  pageRange: PropTypes.number.isRequired,
  setPageRange: PropTypes.func.isRequired,
};

NextPageButton.propTypes = {
  pageRange: PropTypes.number.isRequired,
  setPageRange: PropTypes.func.isRequired,
  lastPage: PropTypes.number.isRequired,
};

Pagination.propTypes = {
  myRef: PropTypes.oneOfType([
    PropTypes.func,
    // eslint-disable-next-line react/forbid-prop-types
    PropTypes.shape({ current: PropTypes.any }),
  ]).isRequired,
  userWord: PropTypes.string.isRequired,
  pageRange: PropTypes.number.isRequired,
  setPageRange: PropTypes.func.isRequired,
  lastPage: PropTypes.number.isRequired,
  userPage: PropTypes.number.isRequired,
  userSort: PropTypes.string.isRequired,
  userCateIndex: PropTypes.number.isRequired,
};

export default Pagination;
