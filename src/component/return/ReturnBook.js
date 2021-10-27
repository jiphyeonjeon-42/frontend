import React, { useState, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";
import BackGround from "../utils/BackGround";
import Title from "../utils/Title";
import "../../css/ReturnBook.css";
import ModalPagination from "../rent/ModalPagination";
import InquireBoxTitle from "../utils/InquireBoxTitle";
import SubTitle from "../utils/SubTitle";
import MidModal from "../utils/MidModal";
import ReturnBookTable from "./ReturnBookTable";
import ReturnBookFilter from "./ReturnBookFilter";
import Login from "../../img/login_icon.svg";
import { useModalSearchInput } from "../utils/ModalSearchBar";

const ReturnBook = () => {
  const myRef = useRef();
  const [modal, setModal] = useState(false);
  const [userSearchWord, setUserSearchWord] =
    useRecoilState(useModalSearchInput);
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
    myRef.current.scrollIntoView();

    setReturnBookList(items);
    setLastreturnBookPage(meta.totalPages);
    console.log(returnBookList);
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
        <div className="returnbook-title" ref={myRef}>
          <Title titleKorean="조회 및 반납" titleEng="INQUIRE & RETURN BOOK" />
        </div>
        <div className="returnbook-subtitle">
          <SubTitle
            subTitle="대출에 필요한 정보를 입력해주세요."
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
              factor={factor}
              openModal={openModal}
              setLendingId={setLendingId}
            />
          ))}
          <div className="returnBook-table__pagination">
            <ModalPagination
              userPage={returnBookPage}
              setUserPage={setReturnBookPage}
              pageRange={returnBookPageRange}
              setPageRange={setReturnBookPageRange}
              lastPage={lastreturnBookPage}
            />
          </div>
        </div>
      </section>
      {modal && <MidModal lendingId={lendingId} handleModal={closeModal} />}
    </main>
  );
};

export default ReturnBook;
