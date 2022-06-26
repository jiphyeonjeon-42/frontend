import React from "react";
import "../../css/MypageRentedBook.css";
import PropTypes from "prop-types";

const MypageRentedBook = ({ rentInfo }) => {
  return (
    <div className="mypage-rented__book">
      {rentInfo && rentInfo[0] ? (
        <div className="mypage-rented__book-wrapper">
          <img
            className="mypage-rented__book-image"
            src={rentInfo[0].image}
            alt={rentInfo[0].image}
          />
          <div className="mypage-rented__book-info">
            <div className="mypage-rented__book-info-titleBox">
              <div className="mypage-rented__book-info-title font-18-bold color-2d">
                {rentInfo[0].title && rentInfo[0].title.length < 22
                  ? rentInfo[0].title
                  : null}
                {rentInfo[0].title && rentInfo[0].title.length >= 22
                  ? rentInfo[0].title.slice(0, 22).concat("...")
                  : null}
              </div>
              <div className="mypage-rented__book-info-writter font-14">
                {rentInfo[0].author && rentInfo[0].author.length < 14
                  ? rentInfo[0].author
                  : null}
                {rentInfo[0].author && rentInfo[0].author.length >= 14
                  ? rentInfo[0].author.slice(0, 14).concat("...")
                  : null}
              </div>
            </div>
            <div className="mypage-rented__book-info-rent font-14">
              <div>대출일시</div>
              <div>
                {rentInfo[0].lendDate
                  ? rentInfo[0].lendDate.slice(0, 10)
                  : "No Data"}
              </div>
              <div>반납기한</div>
              <div>
                {rentInfo[0].duedate
                  ? rentInfo[0].duedate.slice(0, 10)
                  : "No Data"}
              </div>
              <div>연체일</div>
              <div>
                {rentInfo[0].overDueDay
                  ? `${rentInfo[0].overDueDay}일`
                  : "No Data"}
              </div>
              <div>비고</div>
              <div>
                {rentInfo[0].lendingCondition
                  ? rentInfo[0].lendingCondition
                  : "No Data"}
              </div>
            </div>
            <div className="mypage-rented__book-info-reserve font-14">
              <div>예약</div>
              <div>
                {rentInfo[0].reservedNum
                  ? `${rentInfo[0].reservedNum}명`
                  : "No Data"}
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {rentInfo && rentInfo[1] ? (
        <div className="mypage-rented__book-wrapper">
          <img
            className="mypage-rented__book-image"
            src={rentInfo[1].image}
            alt={rentInfo[1].image}
          />
          <div className="mypage-rented__book-info">
            <div className="mypage-rented__book-info-titleBox">
              <div className="mypage-rented__book-info-title font-18-bold color-2d">
                {rentInfo[1].title && rentInfo[1].title.length < 22
                  ? rentInfo[1].title
                  : null}
                {rentInfo[1].title && rentInfo[1].title.length >= 22
                  ? rentInfo[1].title.slice(0, 22).concat("...")
                  : null}
              </div>
              <div className="mypage-rented__book-info-writter font-14">
                {rentInfo[1].author && rentInfo[1].author.length < 14
                  ? rentInfo[1].author
                  : null}
                {rentInfo[1].author && rentInfo[1].author.length >= 14
                  ? rentInfo[1].author.slice(0, 14).concat("...")
                  : null}
              </div>
            </div>
            <div className="mypage-rented__book-info-rent font-14">
              <div>대출일시</div>
              <div>
                {rentInfo[1].lendDate
                  ? rentInfo[1].lendDate.slice(0, 10)
                  : null}
              </div>
              <div>반납기한</div>
              <div>
                {rentInfo[1].duedate
                  ? rentInfo[1].duedate.slice(0, 10)
                  : "No Data"}
              </div>
              <div>연체일</div>
              <div>
                {rentInfo[1].overDueDay
                  ? `${rentInfo[1].overDueDay}일`
                  : "No Data"}
              </div>
              <div>비고</div>
              <div>
                {rentInfo[1].lendingCondition
                  ? rentInfo[1].lendingCondition
                  : "No Data"}
              </div>
            </div>
            <div className="mypage-rented__book-info-reserve font-14">
              <div>예약</div>
              <div>
                {rentInfo[1].reservedNum
                  ? `${rentInfo[1].reservedNum}명`
                  : "No Data"}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

MypageRentedBook.propTypes = {
  // eslint-disable-next-line react/require-default-props
  rentInfo: PropTypes.arrayOf(PropTypes.object.isRequired),
};

export default MypageRentedBook;
