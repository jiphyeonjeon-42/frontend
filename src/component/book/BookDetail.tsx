import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useGetBooksInfoId } from "~/api/books/useGetBooksInfoId";
import BookReservation from "~/component/book/BookReservation";
import BookStatus from "~/component/book/BookStatus";
import BookLocation from "./location/BookLocation";
import Review from "~/component/book/review/Review";
import Banner from "~/component/utils/Banner";
import Image from "~/component/utils/Image";
import Like from "~/component/book/like/Like";
import LocationButton from "~/component/book/location/LocationButton";
import TagWrapper from "~/component/book/tag/TagWrapper";
import "~/asset/css/BookDetail.css";
import { Book } from "~/type";
import HelmetComponent from "../utils/HelmetComponent";

const callsignToNumbers = (callSign: string) =>
  callSign
    .replace(/[^0-9\.]/g, "")
    .split(".")
    .map(Number);

const compareCallsign = (a: Book, b: Book) => {
  const xs = callsignToNumbers(a.callSign);
  const ys = callsignToNumbers(b.callSign);

  return xs.reduce((sum, x, i) => sum + (x - ys[i]), 0);
};

const BookDetail = () => {
  const id = useParams().id || "";
  const myRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  useEffect(() => myRef.current?.scrollIntoView(), []);
  const { bookDetailInfo } = useGetBooksInfoId({ id });
  const [isBookLocationVisible, setIsBookLocationVisible] = useState(false);

  if (!bookDetailInfo) {
    return (
      <main>
        <Banner
          img="bookdetail"
          titleKo="도서 상세 및 예약"
          titleEn="DETAIL & RESERVATION"
        />
        <section className="book-detail-body" />
      </main>
    );
  }

  const handleBookLocationVisible = () => {
    setIsBookLocationVisible(!isBookLocationVisible);
  };

  const isAvailableReservation = () => {
    const { books } = bookDetailInfo;
    const noProblemBooksCnt = books?.filter(book => book.status === 0).length;
    return (
      noProblemBooksCnt &&
      noProblemBooksCnt > 0 &&
      books.reduce((sum, i) => sum + (i.isLendable ? 1 : 0), 0) === 0
    );
  };

  return (
    <main>
      <HelmetComponent
        title={bookDetailInfo.title}
        description={`집현전의 소중한 자산 "${bookDetailInfo.title}" 입니다.`}
        img={bookDetailInfo.image}
      />
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
          <div className="book-detail__photo-likes">
            <div className="book-detail__photo">
              {isBookLocationVisible ? (
                <BookLocation bookDetailInfo={bookDetailInfo} />
              ) : (
                <Image
                  className="book-detail__photo-location"
                  src={bookDetailInfo.image}
                  alt={bookDetailInfo.title}
                />
              )}
            </div>
            <div className="book-detail_buttons">
              <Like bookInfoId={id} />
              <LocationButton
                isBookLocationVisible={isBookLocationVisible}
                onToggleVisibility={handleBookLocationVisible}
              />
            </div>
          </div>
          <div className="book-detail">
            <span className="color-red">도서정보</span>
            <div className="book-detail__reservation-button">
              <div className="book-detail__title">{bookDetailInfo.title}</div>
              <BookReservation
                bookInfoId={+id}
                isAvailableReservation={isAvailableReservation() || false}
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
                  {bookDetailInfo.books
                    ?.toSorted((a, b) => compareCallsign(a, b))
                    .map((book, index) => (
                      <BookStatus
                        key={book.callSign}
                        book={book}
                        index={index}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="book-tag">
          <TagWrapper bookInfoId={id} />
        </div>
        <div className="book-review">
          <Review bookInfoId={id} />
        </div>
      </section>
    </main>
  );
};

export default BookDetail;
