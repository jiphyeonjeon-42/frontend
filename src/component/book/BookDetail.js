/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import useDialog from "../../hook/useDialog";
import useGetBooksInfoId from "../../api/books/useGetBooksInfoId";
import Image from "../utils/Image";
import Banner from "../utils/Banner";
import BookStatus from "./BookStatus";
import BookReservation from "./BookReservation";
import "../../css/BookDetail.css";
import Review from "./review/Review";
import Like from "./like/Like";

const BookDetail = () => {
  const { id } = useParams();
  const myRef = useRef(null);
  const location = useLocation();
  useEffect(() => myRef.current.scrollIntoView(), []);

  const {
    Dialog,
    defaultConfig: dialogDefaultConfig,
    setConfig: setDialogConfig,
    setOpen: openDialog,
    setOpenTitleAndMessage,
  } = useDialog();
  const { bookDetailInfo } = useGetBooksInfoId({ id, setOpenTitleAndMessage });

  const isAvailableReservation = () => {
    const { books } = bookDetailInfo;
    return (
      books.length > 0 &&
      books.reduce((sum, i) => sum + (i.isLendable + i.status), 0) === 0
    );
  };

  return (
    <main>
      <Banner
        img="bookdetail"
        titleKo="도서 상세 및 예약"
        titleEn="DETAIL & RESERVATION"
      />
      <section className="book-detail-body">
        <div className="breadcrumb font-16 color-a4" ref={myRef}>
          {location.state ? `${location.state.bread} ` : "집현전 "} &gt;
          도서상세페이지 및 예약
        </div>
        <div className="book-content">
          <div>
            <div className="book-detail__photo">
              <Image src={bookDetailInfo.image} alt={bookDetailInfo.title} />
            </div>
            <div className="book-likes">
              <Like />
            </div>
          </div>
          <div className="book-detail">
            <span className="color-red">도서정보</span>
            <div className="book-detail__reservation-button">
              <div className="book-detail__title">{bookDetailInfo.title}</div>
              <BookReservation
                bookInfoId={id}
                isAvailableReservation={isAvailableReservation()}
                dialogDefaultConfig={dialogDefaultConfig}
                setDialogConfig={setDialogConfig}
                setOpenTitleAndMessage={setOpenTitleAndMessage}
                openDialog={openDialog}
              />
            </div>
            <div className="book-detail__info">
              <div className="book-detail__info-wrapper color-54">
                <div className="book-detail__info-key">저자</div>
                <div className="book-detail__info-value">
                  {bookDetailInfo.author}
                </div>
              </div>
              <div className="book-detail__info-wrapper color-54">
                <div className="book-detail__info-key">출판사</div>
                <div className="book-detail__info-value">
                  {bookDetailInfo.publisher}
                </div>
              </div>
              {bookDetailInfo.publishedAt && (
                <div className="book-detail__info-wrapper color-54">
                  <div className="book-detail__info-key">발행연월</div>
                  <div className="book-detail__info-value">
                    {bookDetailInfo.publishedAt}
                  </div>
                </div>
              )}
              <div className="book-detail__info-wrapper color-54">
                <div className="book-detail__info-key">카테고리</div>
                <div className="book-detail__info-value">
                  {bookDetailInfo.category}
                </div>
              </div>
            </div>
            <div className="book-state">
              <span className="book-detail__info-status color-54">
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
        <div className="book-review">
          <Review bookInfoId={id} />
        </div>
      </section>
      <Dialog />
    </main>
  );
};

export default BookDetail;
