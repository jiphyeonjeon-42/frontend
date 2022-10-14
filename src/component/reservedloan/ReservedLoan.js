import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";
import ReservedFilter from "./ReservedFilter";
import ReservedTableList from "./ReservedTableList";
import ReservedModalContents from "./ReservedModalContents";
import Tabs from "../utils/Tabs";
import Banner from "../utils/Banner";
import Pagination from "../utils/Pagination";
import InquireBoxTitle from "../utils/InquireBoxTitle";
import useModal from "../../hook/useModal";
import { useAdminSearchInput } from "../../atom/useSearchInput";
import { rentTabList } from "../../data/tablist";
import Reserve from "../../img/list-check-solid.svg";
import "../../css/ReservedLoan.css";

const ReservedLoan = () => {
  const [userSearchWord, setUserSearchWord] =
    useRecoilState(useAdminSearchInput);
  const [resevedLoanPage, setResevedLoanPage] = useState(1);
  const [lastresevedLoanPage, setLastresevedLoanPage] = useState(1);
  const [reservedLoanList, setReservedLoanList] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const [reservedInfo, setReservedInfo] = useState(null);
  const { setOpen: openModal, setClose: closeModal, Modal } = useModal();

  const handleReservedLoanSumbit = event => {
    event.preventDefault();
    const searchForm = document.querySelector(".modal-search-form");
    const searchInputValue = searchForm.querySelector(
      ".modal-search__input",
    ).value;
    setUserSearchWord(searchInputValue);
    setResevedLoanPage(1);
  };

  const filterState = () => {
    if (isPending) return "pending";
    if (isWaiting) return "waiting";
    if (isExpired) return "expired";
    return "all";
  };

  const fetchReservedLoanData = async () => {
    const {
      data: { items, meta },
    } = await axios.get(`${process.env.REACT_APP_API}/reservations/search`, {
      params: {
        query: userSearchWord,
        page: resevedLoanPage - 1,
        limit: 5,
        filter: filterState(),
      },
    });
    setReservedLoanList(items);
    setLastresevedLoanPage(meta.totalPages);
  };

  useEffect(async () => {
    setResevedLoanPage(1);
    await fetchReservedLoanData();
  }, [userSearchWord]);

  useEffect(fetchReservedLoanData, [
    resevedLoanPage,
    isPending,
    isWaiting,
    isExpired,
  ]);

  useEffect(() => {
    const searchForm = document.querySelector(".modal-search-form");
    searchForm.addEventListener("submit", handleReservedLoanSumbit);
    return () =>
      searchForm.removeEventListener("submit", handleReservedLoanSumbit);
  }, [handleReservedLoanSumbit]);

  useEffect(() => {
    setResevedLoanPage(1);
  }, [isPending, isWaiting, isExpired]);

  return (
    <main>
      <Banner img="admin" titleKo="예약 대출" titleEn="BOOK RESERVATION" />
      <Tabs tabList={rentTabList} />
      <section className="reserved-loan-body">
        <div className="inquire-box-wrapper">
          <InquireBoxTitle
            Icon={Reserve}
            titleKO="예약 정보"
            titleEN="Reservation info"
            placeHolder="예약 대출자의 성명 혹은 도서명을 입력해주세요."
          />
        </div>
        <div className="reserved-loan-table__inquire-box">
          <div className="reserved-loan-filter">
            <ReservedFilter
              isPending={isPending}
              setIsPending={setIsPending}
              isExpired={isExpired}
              setIsExpired={setIsExpired}
              isWaiting={isWaiting}
              setIsWaiting={setIsWaiting}
            />
          </div>
          {reservedLoanList.map(factor => (
            <ReservedTableList
              key={factor.id}
              isPending={isPending}
              isWaiting={isWaiting}
              isExpired={isExpired}
              isAll={!(isPending || isWaiting || isExpired)}
              factor={factor}
              openModal={openModal}
              setInfo={setReservedInfo}
            />
          ))}
          <Modal>
            <ReservedModalContents
              reservedInfo={reservedInfo}
              closeModal={closeModal}
            />
          </Modal>
          <div className="reserved-loan-table__pagination">
            <Pagination
              page={resevedLoanPage}
              setPage={setResevedLoanPage}
              lastPage={lastresevedLoanPage}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default ReservedLoan;
