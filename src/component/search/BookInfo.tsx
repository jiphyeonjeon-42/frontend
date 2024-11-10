import { Link } from "react-router-dom";
import { memo } from "react";
import type { BookInfo } from "../../type";
import { splitDate } from "../../util/date";
import Image from "../utils/Image";
import LinkToDetail from "../../asset/img/link_to_detail.svg";
import "../../asset/css/BookInfo.css";

type Props = BookInfo & {
  bread: string;
};

const BookInfo = ({
  id,
  isbn,
  title,
  author,
  publisher,
  image,
  publishedAt,
  category,
  bread,
}: Props) => {
  const [year, month] = splitDate(publishedAt || "");

  return (
    <div className="book-info-wraper">
      <Link
        className="book-info"
        to={`/info/${id}`}
        state={{
          title,
          author,
          publisher,
          image,
          publishedAt,
          category,
          bread,
        }}
      >
        <Image
          className="book-info__image"
          src={image}
          alt={title}
          title={title}
        />
        <div className="book-info__info">
          <div className="book-info__title font-18-bold--letterspacing color-54">
            {title}
          </div>
          <div className="book-info__others font-16 color-54">
            <span>{author}</span>
            <span className="book-info__separator">|</span>
            <span>{publisher}</span>
            <span className="book-info__separator">|</span>
            <span>{category}</span>
          </div>
          <div className="book-info__published-at font-16 color-54">
            <span>발행연월</span>
            <span className="book-info__separator-half" />
            <span>{year && month ? `${year}년 ${month}월` : "-"}</span>
          </div>
          <div className="book-info__isbn font-16 color-54">
            <span>표준부호</span>
            <span className="book-info__separator-half" />
            <span>{isbn}</span>
          </div>
          <Image
            className="book-info__link-icon"
            src={LinkToDetail}
            alt={title}
          />
        </div>
      </Link>
      <div className="book-info__line" />
    </div>
  );
};

export default memo(BookInfo);
