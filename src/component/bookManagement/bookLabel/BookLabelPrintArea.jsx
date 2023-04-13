import PropTypes from "prop-types";
import BookLabelPrintItem from "./BookLabelPrintItem";
import "../../../css/PrintLabel.css";

const BookLabelPrintArea = ({ sortedList, blankLabelNumber, printAreaRef }) => {
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

BookLabelPrintArea.propTypes = {
  sortedList: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  blankLabelNumber: PropTypes.number.isRequired,
  printAreaRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
};
