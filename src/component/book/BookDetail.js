/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Title from "../utils/Title";
import "../../css/BookDetail.css";
import BackGround from "../utils/BackGround";
import BookStatus from "./BookStatus";
// eslint-disable-next-line react/prop-types
const BookDetail = ({ location, match }) => {
  const [data, setData] = useState({ books: [] });
  const { id } = match.params;

  console.log(id);

  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  const fetchData = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/books/info/${id}`,
    );
    setData(response.data);
    console.log(response.data);
  };

  useEffect(fetchData, []);
  // console.log(data);
  // console.log(response.data);
  // console.log(data.books[0]);
  // console.log(bookdata);
  return (
    <main className="bookdetail-main">
      <BackGround page="bookdetail" />
      <section>
        <div className="bookdetail-title">
          <Title
            titleKorean="도서 상세페이지 및 예약"
            titleEng="DETAIL & RESERVATION"
          />
        </div>
      </section>
      <section className="bookdetail-body">
        <div className="breadcrumb">
          <span className="font-16 color-a4">
            {location.state ? `${location.state.bread} ` : "집현전 "} &gt;
            도서상세페이지 및 예약
          </span>
        </div>
        <div className="bookcontent">
          <div className="bookDetail__photo">
            <img src={data.image} alt={data.title} />
          </div>
          <div className="bookDetail__info">
            <span className="bookinfo__title color-red">도서정보</span>
            <div className="bookdetail__info__title">{data.title}</div>
            <div className="detailInfo">
              <div className="detailKey">
                <span className="detailKey__txt">저자</span>
                <span className="detailKey__txt">출판사</span>
                <span className="detailKey__txt">발행연도</span>
                <span className="detailKey__txt">카테고리</span>
                <span className="detailKey__txt">기부자</span>
              </div>
              <div className="detailValue color-54">
                <span className="detailValue__txt">{data.author}</span>
                <span className="detailValue__txt">{data.publisher}</span>
                <span className="detailValue__txt">{data.publishedAt}</span>
                <span className="detailValue__txt">{data.category}</span>
                <span className="detailValue__txt">{data.donators}</span>
              </div>
            </div>
            <div className="bookState">
              <span className="font-18-bold--letterspacing color-54">
                도서 상태 정보
              </span>
              <div className="bookStateList">
                <div>
                  {data.books.map(item => (
                    <BookStatus
                      id={item.id}
                      callSign={item.callSign}
                      status={item.status}
                      dueDate={item.dueDate}
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
