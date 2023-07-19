import { forwardRef } from "react";
import { Book } from "../../../type";
import BookLabelPrintItem from "./BookLabelPrintItem";
import "../../../asset/css/PrintLabel.css";

type Props = {
  sortedList: Book[];
  blankLabelNumber: number;
};

const BookLabelPrintArea = forwardRef<HTMLDivElement, Props>(
  ({ sortedList, blankLabelNumber }, ref) => {
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
      <div className="print-label__print-area" ref={ref}>
        {makeBlankLabel()}
        {sortedList?.map(item => {
          return <BookLabelPrintItem book={item} key={item.bookId} />;
        })}
      </div>
    );
  },
);

export default BookLabelPrintArea;
