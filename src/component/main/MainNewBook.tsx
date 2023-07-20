import { Link } from "react-router-dom";
import Image from "../utils/Image";
import { BookInfo } from "../../type";

type Props = {
  book: BookInfo;
  bookWidth: number;
};

const MainNewBook = ({ book, bookWidth }: Props) => {
  return (
    <div
      className="main-new__book"
      style={{ width: bookWidth, height: bookWidth * 1.5 }}
    >
      <Link to={`/info/${book.id}`} state={{ bread: "신간 도서" }}>
        <Image
          width={bookWidth}
          height={bookWidth * 1.5}
          src={book.image}
          alt="new"
        />
      </Link>
    </div>
  );
};

export default MainNewBook;
