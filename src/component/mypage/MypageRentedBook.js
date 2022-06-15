import React from "react";
import "../../css/MypageRentedBook.css";
import tempImg1 from "../../img/temp1.png";
import tempImg2 from "../../img/temp2.png";

const MypageRentedBook = () => {
  return (
    <div className="mypage-rented__book">
      <div className="mypage-rented__book-wrapper">
        <img
          className="mypage-rented__book-image"
          src={tempImg1}
          alt={tempImg1}
        />
        <div className="mypage-rented__book-info">
          <div className="mypage-rented__book-info-titleBox">
            <div className="mypage-rented__book-info-title font-18">
              보통의 존재
            </div>
            <div className="mypage-rented__book-info-writter font-14">
              이석원씨
            </div>
          </div>
          <div className="mypage-rented__book-info-rent font-14">
            <div>대출</div>
            <div>4월 16일</div>
            <div>반납</div>
            <div>4월 16일</div>
            <div>연체</div>
            <div>4일</div>
            <div>비고</div>
            <div>이상 없음</div>
          </div>
          <div className="mypage-rented__book-info-reserve font-14">
            <div>예약</div>
            <div>4명</div>
          </div>
        </div>
      </div>
      <div className="mypage-rented__book-wrapper">
        <img
          className="mypage-rented__book-image"
          src={tempImg2}
          alt={tempImg2}
        />
        <div className="mypage-rented__book-info">
          <div className="mypage-rented__book-info-titleBox">
            <div className="mypage-rented__book-info-title font-16">
              품위 있는 삶
            </div>
            <div className="mypage-rented__book-info-writter font-14">
              김소월씨
            </div>
          </div>
          <div className="mypage-rented__book-info-rent font-14">
            <div>대출</div>
            <div>4월 16일</div>
            <div>반납</div>
            <div>4월 16일</div>
            <div>연체</div>
            <div>4일</div>
            <div>비고</div>
            <div>이상 없음</div>
          </div>
          <div className="mypage-rented__book-info-reserve font-14">
            <div>예약</div>
            <div>4명</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MypageRentedBook;
