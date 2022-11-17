import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import BookLabel from "./BookLabel";
import { category } from "../../../data/category";
import "../../../css/PrintLabel.css";

const BookLabelModalToPrint = ({ printList }) => {
  const [blankLabel, setBlankLabel] = useState(0);
  const [nowPrint, setNowPrint] = useState(printList);
  const printAreaRef = useRef(null);

  const navigate = useNavigate();
  if (!printList?.length) navigate("/bookmanage");

  function copyStyles(src, dest) {
    Array.from(src.styleSheets).forEach(styleSheet => {
      dest.head.appendChild(styleSheet.ownerNode.cloneNode(true));
    });
    Array.from(src.fonts).forEach(font => dest.fonts.add(font));
  }

  const PrintLabel = () => {
    const windowForPrint = window.open();
    windowForPrint.document.writeln(printAreaRef.current.outerHTML);
    copyStyles(window.document, windowForPrint.document);
    windowForPrint.focus();
    windowForPrint.print();
  };

  const categoryList = () => {
    const categories = [];
    printList.forEach(item => {
      if (categories.every(i => i !== item.callSign[0])) {
        categories.push(item.callSign[0]);
      }
    });
    return categories;
  };

  const filterCategory = e => {
    const listFiltered = printList.filter(
      item => item.callSign[0] === e.currentTarget.value,
    );
    setNowPrint(listFiltered);
  };
  const resetFilter = () => {
    setNowPrint(printList);
  };

  const makeBlankLabel = () => {
    const result = [];
    for (let i = 0; i < blankLabel; i += 1) {
      result.push(
        <div className="print-label__labels">
          <div className="print-label__category-label" />
          <div className="print-label__label" />
        </div>,
      );
    }
    return result;
  };

  const onChangeBlankLabel = e => {
    setBlankLabel(e.currentTarget.value);
  };
  return (
    <>
      <p>빈 라벨 추가하기</p>
      <input type="text" value={blankLabel} onChange={onChangeBlankLabel} />
      <button
        className="print-label__print-button"
        type="button"
        onClick={PrintLabel}
      >
        출력하기
      </button>
      <p className="print-label__category-button-description">
        특정 카테고리만 출력하도록 설정
      </p>
      <div className="pring-label__cateogory-button-section">
        <button
          type="button"
          className="print-label__category-button"
          onClick={resetFilter}
        >
          전체
        </button>
        {categoryList()?.map(item => {
          return (
            <button
              type="button"
              className="print-label__category-button"
              onClick={filterCategory}
              value={item}
              key={item}
            >
              {category.find(i => i.code === item)?.name}
            </button>
          );
        })}
      </div>

      <div className="print-label__preview">
        <div className="print-label__print-area" ref={printAreaRef}>
          {makeBlankLabel()}
          {nowPrint?.map(item => {
            return <BookLabel book={item} key={item.bookId} />;
          })}
        </div>
      </div>
    </>
  );
};

export default BookLabelModalToPrint;

BookLabelModalToPrint.propTypes = {
  printList: PropTypes.arrayOf(PropTypes.object),
};

BookLabelModalToPrint.defaultProps = {
  printList: [],
};
