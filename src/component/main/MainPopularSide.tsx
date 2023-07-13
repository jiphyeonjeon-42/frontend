import { MouseEventHandler } from "react";
import { Book } from "../../type";
import Image from "../utils/Image";

type Props = {
  books: Book[];
  onClick: MouseEventHandler;
  side: string;
};

const MainPopularSide = ({ books, onClick, side }: Props) => {
  return (
    <button
      className={`main__popular__${
        side === "left" ? "left" : "right"
      } main__popular__content main__popular__side`}
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
