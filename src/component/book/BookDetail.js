/* eslint-disable react/prop-types */
import React, { useEffect, useState, useRef } from "react";
import { useRecoilValue } from "recoil";
import { useHistory } from "react-router-dom";
import axios from "axios";
import userState from "../../atom/userState";
import "../../css/BookDetail.css";
import Banner from "../utils/Banner";
import BookStatus from "./BookStatus";
import IMGERR from "../../img/image_onerror.svg";
import MiniModal from "../utils/MiniModal";
import Reservation from "../reservation/Reservation";
import ModalContentsTitleWithMessage from "../utils/ModalContentsTitleWithMessage";
import getErrorMessage from "../../data/error";
import ArrRes from "../../img/arrow_right_res.svg";
import ArrDef from "../../img/arrow_right_res_default.svg";

const BookDetail = ({ location, match }) => {
  const [bookDetailInfo, setbookDetailInfo] = useState({ books: [] });
  const { id } = match.params;
  const myRef = useRef(null);
  const [miniModalView, setMiniModalView] = useState(false);
  const [miniModalClosable, setMiniModalClosable] = useState(true);
  const [errorCode, setErrorCode] = useState(-1);
  const user = useRecoilValue(userState);
  // eslint-disable-next-line prefer-const
  let history = useHistory();

  const openModal = () => {
    if (!user.isLogin) {
      window.location = `/login`;
      return;
    }
    setMiniModalView(true);
  };

  const closeModal = () => {
    if (miniModalClosable) setMiniModalView(false);
    if (errorCode === 304) history.push("/search");
  };

  const getBooksInfo = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/books/info/${id}`)
      .then(res => {
        setErrorCode(-1);
        setbookDetailInfo(res.data);
      })
      .catch(error => {
        setMiniModalView(true);
        setErrorCode(error.response.data.errorCode);
      });
    myRef.current.scrollIntoView();
  };

  useEffect(getBooksInfo, []);

  function subtituteImg(e) {
    e.target.src = IMGERR;
  }

  const [title, content] = getErrorMessage(parseInt(errorCode, 10)).split(
    "\r\n",
  );

  return (
    <main>
      <Banner
        img="bookdetail"
        titleKo="도서 상세페이지 및 예약"
        titleEn="DETAIL & RESERVATION"
      />
      <section className="book-detail-body">
        <div className="breadcrumb" ref={myRef}>
          <span className="font-16 color-a4">
            {location.state ? `${location.state.bread} ` : "집현전 "} &gt;
            도서상세페이지 및 예약
          </span>
        </div>
        <div className="book-content">
          <div className="book-detail__photo">
            <img
              src={bookDetailInfo.image}
              alt={bookDetailInfo.title}
              onError={subtituteImg}
            />
          </div>
          <div className="book-detail">
            <span className="color-red">도서정보</span>
            <div className="book-detail__reservation-button">
              <div className="book-detail__title">{bookDetailInfo.title}</div>
              {bookDetailInfo.books.length > 0 &&
              bookDetailInfo.books.reduce(
                (accumulator, current) => accumulator + current.isLendable,
                0,
              ) === 0 ? (
                <button
                  className="reservation-active-button color-red font-18-bold"
                  type="button"
                  onClick={openModal}
                >
                  예약 하기
                  <img src={ArrRes} alt="Arr" />
                </button>
              ) : (
                <button
                  className="reservation-disable-button color-a4 font-18"
                  type="button"
                  disabled
                >
                  예약 불가
                  <img src={ArrDef} alt="Arr" />
                </button>
              )}
            </div>
            <div className="book-detail__info">
              <div>
                <span className="book-detail__info-key">저자</span>
                <span className="book-detail__info-key">출판사</span>
                <span className="book-detail__info-key">발행연도</span>
                <span className="book-detail__info-key">카테고리</span>
                <span className="book-detail__info-key">기부자</span>
              </div>
              <div className="color-54">
                <span className="book-detail__info-value">
                  {bookDetailInfo.author}
                </span>
                <span className="book-detail__info-value">
                  {bookDetailInfo.publisher}
                </span>
                <span className="book-detail__info-value">
                  {bookDetailInfo.publishedAt}
                </span>
                <span className="book-detail__info-value">
                  {bookDetailInfo.category}
                </span>
                <span className="book-detail__info-value">
                  {bookDetailInfo.books.reduce((accumulator, current) => {
                    if (accumulator === "")
                      return accumulator + current.donator;
                    // eslint-disable-next-line prefer-template
                    return accumulator + ", " + current.donator;
                  }, "")}
                </span>
              </div>
            </div>
            <div className="book-state">
              <span className="font-18-bold--letterspacing color-54">
                도서 상태 정보
              </span>
              <div className="book-state__list">
                <div>
                  {bookDetailInfo.books.map((book, index) => (
                    <BookStatus key={book.id} book={book} index={index} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {miniModalView && (
        <MiniModal closeModal={closeModal}>
          {errorCode < 0 ? (
            <Reservation
              bookInfoId={bookDetailInfo.id}
              closeModal={closeModal}
              setClosable={setMiniModalClosable}
            />
          ) : (
            <ModalContentsTitleWithMessage
              closeModal={closeModal}
              title={title}
              message={content}
            />
          )}
        </MiniModal>
      )}
    </main>
  );
};

export default BookDetail;
