import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { category } from "../../data/category";
import Button from "../utils/Button";
import BookLabelPrintArea from "./bookLabel/BookLabelPrintArea";
import "../../css/BookManagementToPrint.css";

const BookLabelModalToPrint = ({ printList }) => {
  const [blankLabelNumber, setBlankLabelNumber] = useState(0);
  const [sortedList, setSortedList] = useState(printList);
  const printAreaRef = useRef(null);

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
    const categories = new Set();
    printList.forEach(item => {
      categories.add(item.callSign[0]);
    });
    return [...categories];
  };

  const filterCategory = e => {
    const listFiltered = printList.filter(
      item => item.callSign[0] === e.currentTarget.value,
    );
    setSortedList(listFiltered);
  };
  const resetFilter = () => {
    setSortedList(printList);
  };

  return (
    <div className="book-management__print__wrapper">
      <section className="book-management__print__setting">
        <p className="book-management__print__description">빈 라벨 추가하기</p>
        <input
          type="text"
          value={blankLabelNumber}
          onChange={e => {
            setBlankLabelNumber(e.currentTarget.value);
          }}
        />

        <p className="book-management__print__description">
          특정 카테고리만 출력하도록 설정
        </p>
        <div className="book-management__print__cateogories">
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
      </section>

      <section className="book-management__print__preview">
        <div className="book-management__print__scaled-page">
          <BookLabelPrintArea
            printAreaRef={printAreaRef}
            blankLabelNumber={blankLabelNumber}
            sortedList={sortedList}
          />
        </div>
      </section>
      <Button
        className="book-management__print__print-button"
        onClick={PrintLabel}
        value="출력하기"
      />
    </div>
  );
};

export default BookLabelModalToPrint;

BookLabelModalToPrint.propTypes = {
  printList: PropTypes.arrayOf(PropTypes.object),
};

BookLabelModalToPrint.defaultProps = {
  printList: [],
};
