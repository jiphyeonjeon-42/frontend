import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";
import BackGround from "../utils/BackGround";
import Title from "../utils/Title";
import "../../css/ReservedLoan.css";
import SubTitle from "../utils/SubTitle";
import ModalPagination from "../rent/ModalPagination";
import InquireBoxTitle from "../utils/InquireBoxTitle";
import { useModalSearchInput } from "../ModalSearchBar";
import Login from "../../img/login_icon.svg";
import ReservedFilter from "./ReservedFilter";
import Arr from "../../img/arrow_right_black.svg";

const ReservedLoan = () => {
  const [userSearchWord, setUserSearchWord] =
    useRecoilState(useModalSearchInput);
  const [resevedLoanPage, setResevedLoanPage] = useState(1);
  const [resevedLoanPageRange, setResevedLoanPageRange] = useState(0);
  const [lastresevedLoanPage, setLastresevedLoanPage] = useState(1);
  const [reservedLoanList, setReservedLoanList] = useState([]);

  const handleReservedLoanSumbit = event => {
    event.preventDefault();
    const searchForm = document.querySelector(".modal-search-form");
    const searchInputValue = searchForm.querySelector(
      ".modal-search__input",
    ).value;
    setUserSearchWord(searchInputValue);
    setResevedLoanPage(1);
    setResevedLoanPageRange(0);
  };

  const fetchReservedLoanData = async () => {
    const {
      data: { items, meta },
    } = await axios.get(`${process.env.REACT_APP_API}/reservations/search`, {
      params: {
        query: userSearchWord,
        page: resevedLoanPage,
        limit: 5,
      },
    });
    setReservedLoanList(items);
    setLastresevedLoanPage(meta.totalPages);
    console.log(reservedLoanList);
  };

  useEffect(fetchReservedLoanData, [userSearchWord, resevedLoanPage]);

  useEffect(() => {
    const searchForm = document.querySelector(".modal-search-form");
    searchForm.addEventListener("submit", handleReservedLoanSumbit);
    return () =>
      searchForm.removeEventListener("submit", handleReservedLoanSumbit);
  }, [handleReservedLoanSumbit]);

  return (
    <main className="reservedLoan-main">
      <BackGround page="admin" />
      <section>
        <div className="reservedLoan-title">
          <Title titleKorean="예약 대출" titleEng="BOOK RESERVATION" />
        </div>
        <div className="reservedLoan-subtitle">
          <SubTitle
            subTitle="예약대출에 필요한 정보를 입력해주세요."
            description="검색어를 입력하여 예약대출 현황을 확인하세요."
            alignItems="center"
          />
        </div>
      </section>
      <section className="reservedLoan-body">
        <div className="inquire-box-wrapper">
          <InquireBoxTitle
            Icon={Login}
            titleKO="예약 정보"
            titleEN="Reservation info"
            placeHolder="예약 대출자의 성명 혹은 도서명을 입력해주세요."
          />
        </div>
        <div className="inquire-box-reservedLoan-table">
          <div className="reservedLoan-filter">
            <ReservedFilter />
          </div>

          {reservedLoanList.map(factor => (
            <div className="reservedLoan-table-list">
              <div className="reservedLoan-table-list__name font-18-bold color-54">
                {factor.user && factor.user.login}
              </div>
              <button className="reservedLoan-table-list__button" type="button">
                <div className="reservedLoan-table-list__title">
                  <span className="font-18-bold color-54">
                    {factor.book.info.title}
                  </span>
                  <img
                    className="reservedLoan-table-list__arr"
                    src={Arr}
                    alt="arrow"
                  />
                </div>
                <div className="reservedLoan-table-list__info">
                  <span className="re-callSign font-16 color-54">
                    도서등록번호 : {factor.book.callSign}
                  </span>
                  <span className="re-dueDate font-16 color-54">
                    {factor.book.lendings[0] &&
                      `반납 예정일 : ${factor.book.lendings[0].dueDate}`}
                  </span>
                </div>
              </button>
            </div>
          ))}

          <div className="reservedLoan-table__pagination">
            <ModalPagination
              userPage={resevedLoanPage}
              setUserPage={setResevedLoanPage}
              pageRange={resevedLoanPageRange}
              setPageRange={setResevedLoanPageRange}
              lastPage={lastresevedLoanPage}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default ReservedLoan;
