import React from "react";
import Banner from "../utils/Banner";
import Tabs from "../utils/Tabs";
import { managementTabList } from "../../data/tablist";
import "../../css/BookStock.css";

const BookStock = () => {
  return (
    <>
      <Banner img="admin" titleKo="도서 관리" titleEn="BOOK MANAGEMENT" />
      <Tabs tabList={managementTabList} />
      <div className="check_stock_box">
        <button type="button">재고 확인</button>
      </div>
    </>
  );
};

export default BookStock;
