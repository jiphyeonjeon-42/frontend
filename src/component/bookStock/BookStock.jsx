import { useState } from "react";
import Banner from "../utils/Banner";
import Tabs from "../utils/Tabs";
import { bookManagementTabList } from "../../data/tablist";
import BookStockCheckedList from "./BookStockCheckedList";
import BookStockNeedToCheckList from "./BookStockNeedToCheckList";
import BookStockCheckByReadingQR from "./BookStockCheckByReadingQR";

const BookStock = () => {
  const [checkedList, setCheckedList] = useState([]);

  const addChecked = checked => {
    setCheckedList([...checkedList, checked]);
  };

  return (
    <>
      <Banner img="admin" titleKo="도서 관리" titleEn="BOOK MANAGEMENT" />
      <Tabs tabList={bookManagementTabList} />
      <BookStockCheckByReadingQR addChecked={addChecked} />
      <BookStockCheckedList checkedList={checkedList} />
      <BookStockNeedToCheckList />
    </>
  );
};

export default BookStock;
