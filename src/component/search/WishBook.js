import React from "react";
import AlretIcon from "../../img/alret_icon.svg";
import "../../css/WishBook.css";

const WishBook = () => {
  return (
    <div className="wish-book">
      <img className="wish-book__icon" src={AlretIcon} alt="alret_icon" />
      <div className="wish-book__title font-40-bold color-2d">
        원하는 도서를 찾을 수 없나요?
      </div>
      <div className="wish-book__subtitle font-16 color-54">
        등록 희망도서를 신청해보세요!
      </div>
      <button className="wish-book__button font-20 color-ff" type="button">
        희망도서 등록하러 가기
      </button>
    </div>
  );
};

export default WishBook;
