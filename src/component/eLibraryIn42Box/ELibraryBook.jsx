import { Link } from "react-router-dom";

const ELibraryBook = ({ book, rank }) => {
  return (
    <Link className="elibrary__book__wrapper" to={`/info/${book.id}`}>
      {rank ? <span className="elibrary__book__rank">{rank}</span> : null}
      <img
        className="elibrary__book__image"
        src={book.image}
        alt={book.title}
      />
      <p className="elibrary__book__title">{book.title}</p>
      <p className="elibrary__book__author">{book.author}</p>
      <div className="elibrary__book__icon">실물책</div>
    </Link>
  );
};

export default ELibraryBook;
