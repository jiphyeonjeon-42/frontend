import { useState } from "react";
import { Link } from "react-router-dom";
import { BookPreviewType } from "~/type";
import EmphasisInString from "~/component/utils/EmphasisInString";
import Image from "~/component/utils/Image";

type Props = {
  keyword: string;
  books: BookPreviewType[];
};

const BookSearchPreviewList = ({ keyword, books }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="search-preview__list">
      <div className="search-preview__books">
        {books.map((book, index) => (
          <Link
            key={book.id}
            to={`/info/${book.bookInfoId}`}
            className={`search-preview__book ${
              index === selectedIndex ? "selected" : ""
            }`}
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
          </Link>
        ))}
        {books.length === 0 && (
          <p className="search-preview__no-result">검색 결과가 없습니다.</p>
        )}
      </div>
      <Image
        className="search-preview__image"
        width={120}
        height={180}
        src={books[selectedIndex]?.image ?? ""}
        alt={books[selectedIndex]?.title}
      />
    </div>
  );
};

export default BookSearchPreviewList;
