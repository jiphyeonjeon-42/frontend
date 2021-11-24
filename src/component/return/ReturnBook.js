import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";
import BackGround from "../utils/BackGround";
import Title from "../utils/Title";
import "../../css/ReturnBook.css";
import AdminPagination from "../utils/AdminPagination";
import InquireBoxTitle from "../utils/InquireBoxTitle";
import SubTitle from "../utils/SubTitle";
import ReturnBookTable from "./ReturnBookTable";
import ReturnBookFilter from "./ReturnBookFilter";
import Login from "../../img/login_icon.svg";
import { useAdminSearchInput } from "../../atom/useSearchInput";
import ReturnModal from "./ReturnModal";

const ReturnBook = () => {
  const [modal, setModal] = useState(false);
  const [userSearchWord, setUserSearchWord] =
    useRecoilState(useAdminSearchInput);
  const [returnBookPage, setReturnBookPage] = useState(1);
  const [returnBookPageRange, setReturnBookPageRange] = useState(0);
  const [lastreturnBookPage, setLastreturnBookPage] = useState(1);
  const [returnBookList, setReturnBookList] = useState([]);
  const [lendingSort, setLendingSort] = useState(false);
  const [lendingId, setLendingId] = useState(0);

  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };

  const handlereturnBookSumbit = event => {
    event.preventDefault();
    const searchForm = document.querySelector(".modal-search-form");
    const searchInputValue = searchForm.querySelector(
      ".modal-search__input",
    ).value;
    setUserSearchWord(searchInputValue);
    setReturnBookPage(1);
    setReturnBookPageRange(0);
  };

  const fetchreturnBookData = async () => {
    const {
      data: { items, meta },
    } = await axios.get(`${process.env.REACT_APP_API}/lendings/search`, {
      params: {
        query: userSearchWord,
        page: returnBookPage,
        limit: 5,
        sort: lendingSort ? "older" : "new",
      },
    });
    setReturnBookList(items);
    setLastreturnBookPage(meta.totalPages);
  };

  useEffect(() => {
    setUserSearchWord("");
  }, []);

  useEffect(fetchreturnBookData, [userSearchWord, returnBookPage, lendingSort]);

  useEffect(() => {
    const searchForm = document.querySelector(".modal-search-form");
    searchForm.addEventListener("submit", handlereturnBookSumbit);
    return () =>
      searchForm.removeEventListener("submit", handlereturnBookSumbit);
  }, [handlereturnBookSumbit]);

  return (
    <main className="returnbook-main">
      <BackGround page="admin" />
      <section>
        <div className="returnbook-title">
          <Title titleKorean="조회 및 반납" titleEng="INQUIRE & RETURN BOOK" />
        </div>
        <div className="returnbook-subtitle">
          <SubTitle
            subTitle="반납에 필요한 정보를 입력해주세요."
            description="카뎃정보, 도서정보, 비고사항을 입력해주세요"
            alignItems="center"
          />
        </div>
      </section>
      <section className="returnbook-body">
        <div className="inquire-box-wrapper">
          <InquireBoxTitle
            Icon={Login}
            titleKO="현재 대출정보"
            titleEN="Rent info"
            placeHolder="대출자의 성명 또는 대출중인 도서명을 입력해주세요."
          />
        </div>
        <div className="inquire-box-returnBook-table">
          <div className="returnBook-filter">
            <ReturnBookFilter
              lendingSort={lendingSort}
              setLendingSort={setLendingSort}
            />
          </div>
          {returnBookList.map(factor => (
            <ReturnBookTable
              key={factor.id}
              factor={factor}
              openModal={openModal}
              setLendingId={setLendingId}
            />
          ))}
          <div className="returnBook-table__pagination">
            <AdminPagination
              userPage={returnBookPage}
              setUserPage={setReturnBookPage}
              pageRange={returnBookPageRange}
              setPageRange={setReturnBookPageRange}
              lastPage={lastreturnBookPage}
            />
          </div>
        </div>
      </section>
      {modal && <ReturnModal lendingId={lendingId} closeModal={closeModal} />}
    </main>
  );
};

export default ReturnBook;
