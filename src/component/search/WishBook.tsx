import Image from "../utils/Image";
import AlretIcon from "../../asset/img/alret_icon.svg";
import { memo } from "react";
import "../../asset/css/WishBook.css";

const WishBook = () => {
  return (
    <div className="wish-book">
      <Image className="wish-book__icon" src={AlretIcon} alt="alret_icon" />
      <div className="wish-book__title font-40-bold color-2d">
        원하는 도서를 찾을 수 없나요?
      </div>
      <div className="wish-book__subtitle font-16 color-54">
        등록 희망도서를 신청하거나 전자도서관에서 찾아보세요!
      </div>
      <a
        href={import.meta.env.REACT_APP_WISH}
        className="wish-book__button font-20 color-ff"
      >
        희망도서 등록하러 가기
      </a>
      <a
        href={import.meta.env.REACT_APP_E_BOOK_LIBRARY}
        className="e-book_library__button font-20 color-ff"
      >
        전자도서관에서 찾아보기
      </a>
    </div>
  );
};

export default memo(WishBook);
