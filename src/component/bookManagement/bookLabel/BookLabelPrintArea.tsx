import BookLabelPrintItem from "./BookLabelPrintItem";
import "../../../asset/css/PrintLabel.css";
import { RefObject } from "react";
import { Book } from "../../../types";

type Props = {
  sortedList: Book[];
  blankLabelNumber: number;
  printAreaRef: RefObject<HTMLDivElement>;
};

const BookLabelPrintArea = ({
  sortedList,
  blankLabelNumber,
  printAreaRef,
}: Props) => {
  const makeBlankLabel = () => {
    const result = [];
    for (let i = 0; i < blankLabelNumber; i += 1) {
      result.push(
        <div className="print-label__labels">
          <div className="print-label__category-label" />
          <div className="print-label__label" />
        </div>,
      );
    }
    return result;
  };

  return (
    <div className="print-label__print-area" ref={printAreaRef}>
      {makeBlankLabel()}
      {sortedList?.map(item => {
        return <BookLabelPrintItem book={item} key={item.bookId} />;
      })}
    </div>
  );
};

export default BookLabelPrintArea;
