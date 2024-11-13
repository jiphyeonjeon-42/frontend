import "~/asset/css/BookLocation.css";

type BookShelfProps = {
  index: number;
  highlight: boolean;
};

const BookShelf = ({ index, highlight }: BookShelfProps) => {
  return (
    <div
      className={`${highlight ? "shelf_active" : ""} ${
        index <= 2 ? "book-shelf__big" : "book-shelf__small"
      } 
      }`}
    >
      {highlight}
    </div>
  );
};

export default BookShelf;
