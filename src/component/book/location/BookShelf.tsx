import "~/asset/css/BookLocation.css";
import BookShelfSVG from "~/component/book/location/BookShelfSVG";
// import { useRef, useEffect } from "react";

type BookShelfProps = {
  shelfIndex: number;
};

const BookShelf = ({ shelfIndex }: BookShelfProps) => {
  // const shelfRef = useRef<HTMLDivElement | null>(null);
  // useEffect(() => {
  //   if (shelfRef.current) {
  //     shelfRef.current.scrollIntoView({
  //       behavior: "instant",
  //       block: "center",
  //       inline: "center",
  //     });
  //   }
  // });

  return (
    // <div
    //   ref={highlight ? shelfRef : undefined}
    //   className={`${highlight ? "shelf_active" : ""} ${
    //     index <= 2 ? "book-shelf__big" : "book-shelf__small"
    //   }
    //   }`}
    // >
    //   <BookShelfSVG index={index} />
    // </div>
    <div
      className={`${shelfIndex <= 2 ? "book-shelf__big" : "book-shelf__small"}`}
    >
      <BookShelfSVG shelfIndex={shelfIndex} />
    </div>
  );
};

export default BookShelf;
