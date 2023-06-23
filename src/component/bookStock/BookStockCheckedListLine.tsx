import { Book } from "../../type";
import InquireBoxItem from "../utils/InquireBoxItem";
import InquireBoxLine from "../utils/InquireBoxLine";

type Props = {
  book: Book;
};

const BookStockCheckedListLine = ({ book }: Props) => {
  return (
    <InquireBoxLine>
      <InquireBoxItem keyString="bookId" value={book.bookId} />
      <InquireBoxItem keyString="callSign" value={book.callSign} />
      <InquireBoxItem keyString="category" value={book.category} />
      <InquireBoxItem keyString="title" value={book.title} />
    </InquireBoxLine>
  );
};

export default BookStockCheckedListLine;
