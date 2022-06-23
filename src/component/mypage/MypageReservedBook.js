import React from "react";
import "../../css/MypageReservedBook.css";
import axios from "axios";
import PropTypes from "prop-types";

const MypageReservedBook = ({ reserveInfo }) => {
  const onClickCancle = async id => {
    await axios
      .patch(`${process.env.REACT_APP_API}/reservations/cancel/${id}`)
      .catch(err => console.log(err));
  };

  return (
    <div className="mypage-reserved__book">
      {reserveInfo && reserveInfo[0] ? (
        <div className="mypage-reserved__book-wrapper">
          <img
            className="mypage-reserved__book-image"
            src={reserveInfo[0].image}
            alt={reserveInfo[0].image}
          />
          <div className="mypage-reserved__book-info">
            <div className="mypage-reserved__book-info-titleBox">
              <div className="mypage-reserved__book-info-title font-18-bold color-2d">
                {reserveInfo[0].title.length < 22
                  ? reserveInfo[0].title
                  : reserveInfo[0].title.slice(0, 22).concat("...")}{" "}
              </div>
              <div className="mypage-reserved__book-info-writter font-14">
                {reserveInfo[0].author.length < 14
                  ? reserveInfo[0].author
                  : reserveInfo[0].author.slice(0, 14).concat("...")}
              </div>
            </div>
            <div className="mypage-reserved__book-info-rent font-14">
              <div>예약일시</div>
              <div>{reserveInfo[0].reservationDate.slice(0, 10)}</div>
              <div>예약만료</div>
              <div>{reserveInfo[0].endAt.slice(0, 10)}</div>
              <div>예약순위</div>
              <div>{`${reserveInfo[0].ranking}위`}</div>
            </div>
            <button
              className="mypage-reserved__book-cancle_reserve font-14"
              type="button"
              onClick={() => onClickCancle(reserveInfo[0].reservationId)}
            >
              예약 취소
            </button>
          </div>
        </div>
      ) : null}
      {reserveInfo && reserveInfo[1] ? (
        <div className="mypage-reserved__book-wrapper">
          <img
            className="mypage-reserved__book-image"
            src={reserveInfo[1].image}
            alt={reserveInfo[1].image}
          />
          <div className="mypage-reserved__book-info">
            <div className="mypage-reserved__book-info-titleBox">
              <div className="mypage-reserved__book-info-title font-18-bold color-2d">
                {reserveInfo[1].title.length < 22
                  ? reserveInfo[1].title
                  : reserveInfo[1].title.slice(0, 22).concat("...")}{" "}
              </div>
              <div className="mypage-reserved__book-info-writter font-14">
                {reserveInfo[1].author.length < 14
                  ? reserveInfo[1].author
                  : reserveInfo[1].author.slice(0, 14).concat("...")}
              </div>
            </div>
            <div className="mypage-reserved__book-info-rent font-14">
              <div>예약일시</div>
              <div>{reserveInfo[1].reservationDate.slice(0, 10)}</div>
              <div>예약만료</div>
              <div>{reserveInfo[1].endAt.slice(0, 10)}</div>
              <div>예약순위</div>
              <div>{`${reserveInfo[1].ranking}위`}</div>
            </div>
            <button
              className="mypage-reserved__book-cancle_reserve font-14"
              type="button"
              onClick={() => onClickCancle(reserveInfo[1].reservationId)}
            >
              예약 취소
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

MypageReservedBook.propTypes = {
  // eslint-disable-next-line react/require-default-props
  reserveInfo: PropTypes.arrayOf(PropTypes.object.isRequired),
};

export default MypageReservedBook;
