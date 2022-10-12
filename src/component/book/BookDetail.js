/* eslint-disable react/prop-types */
import React, { useEffect, useState, useRef } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import userState from "../../atom/userState";
import "../../css/BookDetail.css";
import Banner from "../utils/Banner";
import BookStatus from "./BookStatus";
import IMGERR from "../../img/image_onerror.svg";
import Reservation from "../reservation/Reservation";
import useDialog from "../../hook/useDialog";
import useModal from "../../hook/useModal";
import getErrorMessage from "../../data/error";
import ArrRes from "../../img/arrow_right_res.svg";
import ArrDef from "../../img/arrow_right_res_default.svg";

const BookDetail = () => {
  const [bookDetailInfo, setbookDetailInfo] = useState({ books: [] });
  const { id } = useParams();
  const myRef = useRef(null);
  const user = useRecoilValue(userState);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    setOpen: openDialog,
    config: dialogConfig,
    setConfig: setDialogConfig,
    Dialog,
  } = useDialog();

  const { setOpen: openModal, setClose: closeModal, Modal } = useModal();

  const getBooksInfo = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/books/info/${id}`)
      ?.then(res => {
        setbookDetailInfo(res.data);
      })
      ?.catch(error => {
        const errorCode = parseInt(error?.response?.data?.errorCode, 10);
        const [title, message] = getErrorMessage(errorCode).split("\r\n");
        const afterCloseDialog = () => {
          if (errorCode === 304) navigate("/search");
          else if (!user.isLogin) navigate("/login");
          window.scrollTo(0, 0);
        };
        setDialogConfig({
          ...dialogConfig,
          afterClose: afterCloseDialog,
          title,
          message,
        });
        openDialog();
      });
    myRef.current.scrollIntoView();
  };

  useEffect(getBooksInfo, []);

  function subtituteImg(e) {
    e.target.src = IMGERR;
  }

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
              // 대출가능한 책들 중에서 예약이 가능한지 판단
              bookDetailInfo.books.reduce(
                (accumulator, current) =>
                  accumulator + (current.isLendable + current.status),
                0,
              ) === 0 ? (
                <button
                  className="reservation-active-button color-red"
                  type="button"
                  onClick={openModal}
                >
                  예약 하기
                  <img src={ArrRes} alt="Arr" />
                </button>
              ) : (
                <button
                  className="reservation-disable-button color-a4"
                  type="button"
                  disabled
                >
                  대출 가능
                  <img src={ArrDef} alt="Arr" />
                </button>
              )}
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
              <div className="book-detail__info-wrapper color-54">
                <div className="book-detail__info-key">기부자</div>
                <div className="book-detail__info-value">
                  {bookDetailInfo.books.reduce((accumulator, current) => {
                    if (!current.donator) return accumulator;
                    if (accumulator === "" || current.donator === "")
                      return accumulator + current.donator;
                    // eslint-disable-next-line prefer-template
                    return accumulator + ", " + current.donator;
                  }, "")}
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
      </section>
      <Dialog />
      <Modal>
        <Reservation bookInfoId={bookDetailInfo.id} closeModal={closeModal} />
      </Modal>
    </main>
  );
};

export default BookDetail;
