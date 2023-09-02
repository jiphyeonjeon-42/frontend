import { Link } from "react-router-dom";
import type { BookInfo } from "~/type";
import Image from "~/component/utils/Image";

type Props = {
  book: BookInfo;
  bookWidth: number;
};

const MainNewBook = ({ book, bookWidth }: Props) => {
  return (
    <Link
      className="main-new__book"
      to={`/info/${book.id}`}
      state={{ bread: "신간 도서" }}
      style={{ width: bookWidth, height: bookWidth * 1.5 }}
    >
      <Image
        width={bookWidth}
        height={bookWidth * 1.5}
        src={book.image}
        alt="new"
      />
    </Link>
  );
};

export default MainNewBook;
