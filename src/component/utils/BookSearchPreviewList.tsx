import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookPreviewType } from "~/component/utils/BookSearchPreview";
import EmphasisInString from "~/component/utils/EmphasisInString";
import Image from "~/component/utils/Image";

type Props = {
  keyword: string;
  books: BookPreviewType[];
};

const BookSearchPreviewList = ({ keyword, books }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  return (
    <div className="search-preview__list">
      <div className="search-preview__books">
        {books.map((book, index) => (
          <button
            type="button"
            key={book.id}
            value={book.id}
            className={`search-preview__book ${
              index === selectedIndex ? "selected" : ""
            }`}
            onClick={e => {
              e.preventDefault();
              navigate(`/info/${book.id}`);
            }}
            onMouseOver={() => setSelectedIndex(index)}
          >
            <p className="search-preview__book__title">
              <EmphasisInString wholeString={book.title} emphasis={keyword} />
            </p>
            <span className="search-preview__book__author">
              <EmphasisInString wholeString={book.author} emphasis={keyword} />
            </span>
            <span className="search-preview__book__publisher">
              <EmphasisInString
                wholeString={book.publisher}
                emphasis={keyword}
              />
            </span>
          </button>
        ))}
      </div>
      <Image
        className="search-preview__image"
        width={120}
        height={180}
        src={books[selectedIndex]?.image}
        alt={books[selectedIndex]?.title}
      />
    </div>
  );
};

export default BookSearchPreviewList;
