import React from "react";
import HistoryTable from "./HistoryTable";
import HistoryFilter from "./HistoryFilter";
import Tabs from "../utils/Tabs";
import Banner from "../utils/Banner";
import Pagination from "../utils/Pagination";
import InquireBoxTitle from "../utils/InquireBoxTitle";
import useDialog from "../../hook/useDialog";
import useGetHistories from "../../api/histories/useGetHistories";
import { rentTabList } from "../../data/tablist";
import Book from "../../img/book-arrow-up-free-icon-font.svg";
import "../../css/Histories.css";

const History = () => {
  const { setOpenTitleAndMessage, Dialog } = useDialog();

  const { historiesList, lastPage, page, type, setPage, setQuery, setType } =
    useGetHistories({ setOpenTitleAndMessage });

  return (
    <main>
      <Banner
        img="admin"
        titleKo="전체 대출/반납 기록"
        titleEn="RENT & RETURN HISTORY"
      />
      <Tabs tabList={rentTabList} />
      <section className="inquire-box-wrapper">
        <InquireBoxTitle
          Icon={Book}
          titleKO="전체 기록"
          titleEN="history"
          placeHolder="찾고자하는 대출/반납 기록의 책, 사서명을 입력해주세요."
          setQuery={setQuery}
        />
        <div className="histories-table__inquire-box">
          <div className="histories-filter">
            <HistoryFilter type={type} setType={setType} />
          </div>
          {historiesList.map(factor => (
            <HistoryTable key={factor.id} factor={factor} />
          ))}
          <div className="histories-table__pagination">
            <Pagination page={page} setPage={setPage} lastPage={lastPage} />
          </div>
        </div>
      </section>
      <Dialog />
    </main>
  );
};

export default History;
