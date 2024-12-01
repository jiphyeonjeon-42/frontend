import Image from "./Image";
import "../../asset/css/BookInformationWithCover.css";
import { memo } from "react";

type Props = {
  wrapperClassName?: string;
  bookCoverImg?: string;
  bookCoverAlt: string;
  children: React.ReactNode;
};

const BookInformationWithCover = ({
  wrapperClassName,
  bookCoverImg,
  bookCoverAlt,
  children,
}: Props) => {
  return (
    <div className={`book-info__wrapper ${wrapperClassName}`}>
      <div className="book-info__cover">
        <Image
          className="book-info__cover-img"
          src={bookCoverImg}
          alt={bookCoverAlt}
        />
      </div>
      <div className="book-info__detail">{children}</div>
    </div>
  );
};

export default memo(BookInformationWithCover);

BookInformationWithCover.defaultProps = {
  wrapperClassName: "",
};
