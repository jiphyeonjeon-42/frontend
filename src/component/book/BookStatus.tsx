import "../../asset/css/BookStatus.css";

type Props = {
  book: {
    id?: number;
    callSign?: string;
    donator?: string;
    dueDate?: string;
    isLendable?: boolean;
    isReserved?: boolean;
    status?: number;
  };
  index: number;
};

const BookStatus = ({ book, index }: Props) => {
  const doubleDigit = number => {
    return number < 10 ? `0${number}` : `${number}`;
  };

  const getBookStatus = (isLendable, isReserved, dueDate, status) => {
    if (status === 3) return "지정 도서(대출불가)";
    if (status === 2) return "파손 도서";
    if (status === 1) return "분실 도서";
    if (isReserved === 1) return "예약 중";
    if (dueDate !== "-") return "대출 중";
    if (isLendable) return "비치 중";
    return "대출 불가";
  };

  return (
    <div className="book-status color-54">
      <div className="book-status__id">{doubleDigit(index + 1)}</div>
      <div className="book-status__callSign">{book.callSign}</div>
      <div className="book-status__status">
        {getBookStatus(
          book.isLendable,
          book.isReserved,
          book.dueDate,
          book.status,
        )}
      </div>
      <div className="book-status__dueDate">
        {book.dueDate === "-" ? "-" : book.dueDate.slice(0, 10)}
      </div>
      {book.donator ? (
        <div className="book-status__donator">{`${book.donator} 기부`}</div>
      ) : null}
    </div>
  );
};

export default BookStatus;
