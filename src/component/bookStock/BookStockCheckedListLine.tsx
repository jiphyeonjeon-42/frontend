import { Book } from "../../type";
import InquireBoxItem from "../utils/InquireBoxItem";
import InquireBoxLine from "../utils/InquireBoxLine";

type Props = {
  book: Book;
};

const BookStockCheckedListLine = ({
  book: { bookId, callSign, category, title },
}: Props) => {
  return (
    <InquireBoxLine>
      <InquireBoxItem keyString="bookId" value={bookId} />
      <InquireBoxItem keyString="callSign" value={callSign} />
      <InquireBoxItem keyString="category" value={category} />
      <InquireBoxItem keyString="title" value={title} />
    </InquireBoxLine>
  );
};

export default BookStockCheckedListLine;
