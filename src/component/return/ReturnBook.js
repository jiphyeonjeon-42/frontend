import React, { useState } from "react";
import ReturnBookTable from "./ReturnBookTable";
import ReturnBookFilter from "./ReturnBookFilter";
import ReturnModalContents from "./ReturnModalContents";
import ReturnBookWithBarcodeReader from "./ReturnBookWithBarcodeReader";
import Tabs from "../utils/Tabs";
import Banner from "../utils/Banner";
import Pagination from "../utils/Pagination";
import InquireBoxTitle from "../utils/InquireBoxTitle";
import useDialog from "../../hook/useDialog";
import useModal from "../../hook/useModal";
import useGetLendingsSearch from "../../api/lendings/useGetLendingsSearch";

import { rentTabList } from "../../data/tablist";
import Book from "../../img/book-arrow-up-free-icon-font.svg";
import "../../css/ReturnBook.css";

const ReturnBook = () => {
  const [lendingId, setLendingId] = useState(0);

  const { setOpen: openModal, setClose: closeModal, Modal } = useModal();
  const { setOpenTitleAndMessage, Dialog } = useDialog();

  const {
    returnBookList,
    lastPage,
    page,
    setPage,
    setQuery,
    isSortNew,
    setIsSortNew,
  } = useGetLendingsSearch({ setOpenTitleAndMessage });

  return (
    <main>
      <Banner
        img="admin"
        titleKo="조회 및 반납"
        titleEn="INQUIRE & RETURN BOOK"
      />
      <Tabs tabList={rentTabList} />
      <ReturnBookWithBarcodeReader
        openModal={openModal}
        setLendingId={setLendingId}
      />
      <section className="inquire-box-wrapper">
        <InquireBoxTitle
          Icon={Book}
          titleKO="현재 대출정보"
          titleEN="Rent info"
          placeHolder="대출자의 성명 또는 대출중인 도서명을 입력해주세요."
          setQuery={setQuery}
        />
        <div className="return-book-table__inquire-box">
          <div className="return-book-filter">
            <ReturnBookFilter
              lendingSort={isSortNew}
              setLendingSort={setIsSortNew}
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
            <Pagination page={page} setPage={setPage} lastPage={lastPage} />
          </div>
        </div>
      </section>
      <Dialog />
      <Modal>
        <ReturnModalContents
          lendingId={lendingId}
          closeModal={closeModal}
          setOpenTitleAndMessage={setOpenTitleAndMessage}
        />
      </Modal>
    </main>
  );
};

export default ReturnBook;
