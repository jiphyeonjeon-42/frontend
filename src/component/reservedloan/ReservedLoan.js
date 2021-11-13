import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";
import BackGround from "../utils/BackGround";
import Title from "../utils/Title";
import "../../css/ReservedLoan.css";
import SubTitle from "../utils/SubTitle";
import AdminPagination from "../utils/AdminPagination";
import InquireBoxTitle from "../utils/InquireBoxTitle";
import { useAdminSearchInput } from "../../atom/useSearchInput";
import Login from "../../img/login_icon.svg";
import ReservedFilter from "./ReservedFilter";
import ReservedTableList from "./ReservedTableList";
import ReservedModal from "./ReservedModal";
// import PropTypes from "prop-types";

const ReservedLoan = () => {
  const [modal, setModal] = useState(false);
  const [userSearchWord, setUserSearchWord] =
    useRecoilState(useAdminSearchInput);
  const [resevedLoanPage, setResevedLoanPage] = useState(1);
  const [resevedLoanPageRange, setResevedLoanPageRange] = useState(0);
  const [lastresevedLoanPage, setLastresevedLoanPage] = useState(1);
  const [reservedLoanList, setReservedLoanList] = useState([]);
  const [isProceeding, setProceeding] = useState(true);
  const [isFinish, setFinish] = useState(false);
  const [reservedInfo, setReservedInfo] = useState(null);

  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };
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

  const filterState = () => {
    if (isProceeding && isFinish) return "proceeding,finish";
    if (isProceeding) return "proceeding";
    if (isFinish) return "finish";
    return "";
  };

  const fetchReservedLoanData = async () => {
    const {
      data: { items, meta },
    } = await axios.get(`${process.env.REACT_APP_API}/reservations/search`, {
      params: {
        query: userSearchWord,
        page: resevedLoanPage,
        limit: 5,
        filter: filterState(),
      },
    });
    setReservedLoanList(items);
    setLastresevedLoanPage(meta.totalPages);
    console.log(reservedLoanList);
  };

  useEffect(() => {
    setUserSearchWord("");
  }, []);

  useEffect(fetchReservedLoanData, [
    userSearchWord,
    resevedLoanPage,
    isProceeding,
    isFinish,
  ]);

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
            <ReservedFilter
              isProceeding={isProceeding}
              setProceeding={setProceeding}
              isFinish={isFinish}
              setFinish={setFinish}
            />
          </div>
          {reservedLoanList.map(factor => (
            <ReservedTableList
              factor={factor}
              openModal={openModal}
              setInfo={setReservedInfo}
            />
          ))}
          <div className="reservedLoan-table__pagination">
            <AdminPagination
              userPage={resevedLoanPage}
              setUserPage={setResevedLoanPage}
              pageRange={resevedLoanPageRange}
              setPageRange={setResevedLoanPageRange}
              lastPage={lastresevedLoanPage}
            />
          </div>
        </div>
      </section>
      {modal && (
        <ReservedModal reservedInfo={reservedInfo} handleModal={closeModal} />
      )}
    </main>
  );
};

export default ReservedLoan;
