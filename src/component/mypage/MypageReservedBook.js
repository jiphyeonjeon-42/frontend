import React from "react";
import "../../css/MypageReservedBook.css";
import PropTypes from "prop-types";
import tempImg1 from "../../img/temp1.png";
import tempImg2 from "../../img/temp2.png";

const MypageReservedBook = ({ reserveInfo }) => {
  console.log(reserveInfo);
  return (
    <div className="mypage-reserved__book">
      <div className="mypage-reserved__book-wrapper">
        <img
          className="mypage-reserved__book-image"
          src={tempImg1}
          alt={tempImg1}
        />
        <div className="mypage-reserved__book-info">
          <div className="mypage-reserved__book-info-titleBox">
            <div className="mypage-reserved__book-info-title font-18-bold color-2d">
              보통의 존재
            </div>
            <div className="mypage-reserved__book-info-writter font-14">
              이석원씨
            </div>
          </div>
          <div className="mypage-reserved__book-info-rent font-14">
            <div>대출일시</div>
            <div>4월 16일</div>
            <div>반납예정</div>
            <div>4월 16일</div>
            <div>연체일</div>
            <div>4일</div>
            <div>비고</div>
            <div>이상 없음</div>
          </div>
          <div className="mypage-reserved__book-info-reserve font-14">
            <div>예약</div>
            <div>4명</div>
          </div>
          <div className="mypage-reserved__book-cancle_reserve font-14">
            예약 취소
          </div>
        </div>
      </div>
      <div className="mypage-reserved__book-wrapper">
        <img
          className="mypage-reserved__book-image"
          src={tempImg2}
          alt={tempImg2}
        />
        <div className="mypage-reserved__book-info">
          <div className="mypage-reserved__book-info-titleBox">
            <div className="mypage-reserved__book-info-title font-18-bold color-2d">
              품위 있는 삶
            </div>
            <div className="mypage-reserved__book-info-writter font-14">
              김소월씨
            </div>
          </div>
          <div className="mypage-reserved__book-info-rent font-14">
            <div>대출일시</div>
            <div>4월 16일</div>
            <div>반납예정</div>
            <div>4월 16일</div>
            <div>연체일</div>
            <div>4일</div>
            <div>비고</div>
            <div>이상 없음</div>
          </div>
          <div className="mypage-reserved__book-info-reserve font-14">
            <div>예약</div>
            <div>4명</div>
          </div>
          <div className="mypage-reserved__book-cancle_reserve font-14">
            예약 취소
          </div>
        </div>
      </div>
    </div>
  );
};

MypageReservedBook.propTypes = {
  reserveInfo: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default MypageReservedBook;
