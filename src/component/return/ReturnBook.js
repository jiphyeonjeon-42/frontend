import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";
import Banner from "../utils/Banner";
import "../../css/ReturnBook.css";
import Pagination from "../utils/Pagination";
import InquireBoxTitle from "../utils/InquireBoxTitle";
import ReturnBookTable from "./ReturnBookTable";
import ReturnBookFilter from "./ReturnBookFilter";
import Book from "../../img/book-arrow-up-free-icon-font.svg";
import { useAdminSearchInput } from "../../atom/useSearchInput";
import ReturnModal from "./ReturnModal";
import Tabs from "../utils/Tabs";
import { rentTabList } from "../../data/tablist";

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
        page: returnBookPage - 1,
        limit: 5,
        sort: lendingSort ? "old" : "new",
      },
    });
    setReturnBookList(items);
    setLastreturnBookPage(meta.totalPages);
  };

  useEffect(() => {
    setUserSearchWord("");
  }, []);

  useEffect(async () => {
    setReturnBookPage(1);
    await fetchreturnBookData();
  }, [userSearchWord]);

  useEffect(fetchreturnBookData, [returnBookPage, lendingSort]);

  useEffect(() => {
    const searchForm = document.querySelector(".modal-search-form");
    searchForm.addEventListener("submit", handlereturnBookSumbit);
    return () =>
      searchForm.removeEventListener("submit", handlereturnBookSumbit);
  }, [handlereturnBookSumbit]);

  return (
    <main>
      <Banner
        img="admin"
        titleKo="조회 및 반납"
        titleEn="INQUIRE & RETURN BOOK"
      />
      <Tabs tabList={rentTabList} />
      <section className="inquire-box-wrapper">
        <InquireBoxTitle
          Icon={Book}
          titleKO="현재 대출정보"
          titleEN="Rent info"
          placeHolder="대출자의 성명 또는 대출중인 도서명을 입력해주세요."
        />
        <div className="return-book-table__inquire-box">
          <div className="return-book-filter">
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
          <div className="return-book-table__pagination">
            <Pagination
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
