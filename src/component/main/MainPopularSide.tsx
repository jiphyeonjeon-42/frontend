import { MouseEventHandler } from "react";
import { BookInfo } from "../../type";
import Image from "../utils/Image";

type Props = {
  books: BookInfo[];
  onClick: MouseEventHandler;
  side: "left" | "right";
};

const MainPopularSide = ({ books, onClick, side }: Props) => {
  return (
    <button
      className={`main__popular__${side} main__popular__content main__popular__side`}
      type="button"
      onClick={onClick}
    >
      {books.map(book => (
        <div className="main__popular__basic-book" key={book.id}>
          <Image
            src={book.image}
            alt={book.title}
            className="main__popular__basic-img"
          />
        </div>
      ))}
    </button>
  );
};

export default MainPopularSide;
