import { MouseEventHandler, useRef, useState } from "react";
import { category } from "../../constant/category";
import { Book } from "../../type";
import Button from "../utils/Button";
import BookLabelPrintArea from "./bookLabel/BookLabelPrintArea";
import "../../asset/css/BookManagementToPrint.css";

type Props = {
  printList: Book[];
};

const BookLabelModalToPrint = ({ printList }: Props) => {
  const [blankLabelNumber, setBlankLabelNumber] = useState(0);
  const [sortedList, setSortedList] = useState(printList);
  const printAreaRef = useRef<HTMLDivElement>(null);

  function copyStyles(src: Document, dest: Document) {
    // 새창으로 라벨 출력 시 스타일 복사
    Array.from(src.styleSheets).forEach(styleSheet => {
      if (styleSheet.ownerNode)
        dest.head.appendChild(styleSheet.ownerNode.cloneNode(true));
    });
    Array.from(src.fonts).forEach(font => dest.fonts.add(font));
  }

  const PrintLabel = () => {
    const windowForPrint = window.open();
    if (windowForPrint && printAreaRef.current) {
      windowForPrint.document.writeln(printAreaRef.current.outerHTML);
      copyStyles(window.document, windowForPrint.document);
      windowForPrint.focus();
      // 스타일 복사 완료 기다린 후 인쇄 요청
      setTimeout(() => windowForPrint.print(), 500);
    }
  };

  const categoryList = () => {
    const categories = new Set<string>();
    printList.forEach(item => categories.add(item.callSign[0]));
    return [...categories];
  };

  const filterCategory: MouseEventHandler<HTMLButtonElement> = e => {
    const code = e.currentTarget.value;
    const listFiltered = printList.filter(item => item.callSign[0] === code);
    setSortedList(listFiltered);
  };

  const resetFilter = () => setSortedList(printList);

  return (
    <div className="book-management__print__wrapper">
      <h2 className="book-management__print__title">라벨지 출력</h2>
      <p className="book-management__print__title-sub">
        주의 : 여백이 특정 라벨지에 맞춰있지만 인쇄설정에 따라 제대로 출력되지
        않을 수 있습니다.
      </p>
      <section className="book-management__print__setting">
        <h3 className="book-management__print__setting-title">인쇄 설정</h3>
        <div className="book-management__print__setting-detail">
          <p className="book-management__print__description">
            빈 라벨 추가하기
          </p>
          <input
            type="text"
            value={blankLabelNumber}
            onChange={e => setBlankLabelNumber(+e.currentTarget.value)}
          />

          <p className="book-management__print__description">카테고리별 출력</p>
          <div className="book-management__print__cateogories">
            <button
              type="button"
              className={`book-management__print__category-button
                 ${sortedList.length === printList.length && "red"}`}
              onClick={resetFilter}
            >
              전체
            </button>
            {categoryList().map(item => {
              return (
                <button
                  type="button"
                  className={`book-management__print__category-button ${
                    sortedList.every(sorted => sorted.callSign[0] === item) &&
                    "red"
                  }`}
                  onClick={filterCategory}
                  value={item}
                  key={item}
                >
                  {category.find(i => i.code === item)?.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="book-management__print__preview">
        <div className="book-management__print__scaled-page">
          <BookLabelPrintArea
            ref={printAreaRef}
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

BookLabelModalToPrint.defaultProps = {
  printList: [],
};
