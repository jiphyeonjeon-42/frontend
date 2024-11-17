import "~/asset/css/BookLocation.css";
import { useRef, useEffect } from "react";

type BookShelfProps = {
  index: number;
  highlight: boolean;
};

const BookShelf = ({ index, highlight }: BookShelfProps) => {
  const shelfRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (highlight && shelfRef.current) {
      shelfRef.current.scrollIntoView({
        behavior: "instant",
        block: "center",
        inline: "center",
      });
    }
  }, [highlight]);

  return (
    <div
      ref={highlight ? shelfRef : undefined}
      className={`${highlight ? "shelf_active" : ""} ${
        index <= 2 ? "book-shelf__big" : "book-shelf__small"
      } 
      }`}
    ></div>
  );
};

export default BookShelf;
