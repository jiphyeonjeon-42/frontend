/* eslint-disable react/prop-types */
// import React, { useEffect, useState, useRef } from "react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/BookDetail.css";
import Banner from "../utils/Banner";
import BookStatus from "./BookStatus";
import IMGERR from "../../img/image_onerror.svg";
// eslint-disable-next-line react/prop-types

const BookDetail = ({ location, match }) => {
  const [data, setData] = useState({ books: [] });
  const { id } = match.params;
  // const myRef = useRef(null);

  const fetchData = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/books/info/${id}`,
    );
    setData(response.data);
    // myRef.current.scrollIntoView();
  };

  useEffect(fetchData, []);

  function subtituteImg(e) {
    e.target.src = IMGERR;
  }

  return (
    <main>
      <Banner
        img="bookdetail"
        titleKo="도서 상세페이지 및 예약"
        titleEn="DETAIL & RESERVATION"
      />
      <section className="book-detail-body">
        <div className="breadcrumb">
          <span className="font-16 color-a4">
            {location.state ? `${location.state.bread} ` : "집현전 "} &gt;
            도서상세페이지 및 예약
          </span>
        </div>
        <div className="book-content">
          <div className="book-detail__photo">
            <img src={data.image} alt={data.title} onError={subtituteImg} />
          </div>
          <div className="book-detail">
            <span className="book-detail__title color-red">도서정보</span>
            <div className="book-detail__title">{data.title}</div>
            <div className="book-detail__info">
              <div>
                <span className="book-detail__info-key">저자</span>
                <span className="book-detail__info-key">출판사</span>
                <span className="book-detail__info-key">발행연도</span>
                <span className="book-detail__info-key">카테고리</span>
                <span className="book-detail__info-key">기부자</span>
              </div>
              <div className="color-54">
                <span className="book-detail__info-value">{data.author}</span>
                <span className="book-detail__info-value">
                  {data.publisher}
                </span>
                <span className="book-detail__info-value">
                  {data.publishedAt}
                </span>
                <span className="book-detail__info-value">{data.category}</span>
                <span className="book-detail__info-value">{data.donators}</span>
              </div>
            </div>
            <div className="book-state">
              <span className="font-18-bold--letterspacing color-54">
                도서 상태 정보
              </span>
              <div className="book-state__list">
                <div>
                  {data.books.map((item, index) => (
                    <BookStatus
                      key={item.id}
                      id={item.id}
                      callSign={item.callSign}
                      status={item.status}
                      dueDate={item.dueDate}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BookDetail;
