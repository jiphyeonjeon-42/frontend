import { useState } from "react";
import HistoryTable from "./HistoryTable";
import HistoryFilter from "./HistoryFilter";
import HistoryModalContents from "./HistoryModalContents";
import Tabs from "../utils/Tabs";
import Banner from "../utils/Banner";
import Pagination from "../utils/Pagination";
import { useModal } from "../../hook/useModal";
import InquireBoxTitle from "../utils/InquireBoxTitle";
import { useDialog } from "../../hook/useDialog";
import { useGetHistories } from "../../api/histories/useGetHistories";
import { rentTabList } from "../../constant/tablist";
import Book from "../../asset/img/book-arrow-up-free-icon-font.svg";
import { History } from "../../type";
import "../../asset/css/Histories.css";

const History = () => {
  const [historyInfo, setHistoryInfo] = useState<History>();
  const { setOpen: openModal, Modal } = useModal();
  const { setOpenTitleAndMessage, Dialog } = useDialog();
  const { historiesList, lastPage, page, type, setPage, setQuery, setType } =
    useGetHistories({ setOpenTitleAndMessage });

  return (
    <main>
      <Dialog />
      <Banner
        img="admin"
        titleKo="전체 대출/반납 기록"
        titleEn="RENT & RETURN HISTORY"
      />
      <Tabs tabList={rentTabList} />
      <section className="inquire-box-wrapper">
        <InquireBoxTitle
          Icon={Book}
          titleKO="전체기록"
          titleEN="history"
          placeHolder="찾고자하는 대출/반납 기록의 책, 유저명을 입력해주세요."
          setQuery={setQuery}
        />
        <div className="histories-table__inquire-box">
          <HistoryFilter type={type} setType={setType} />
          {historiesList.map(history => (
            <HistoryTable
              key={history.id}
              history={history}
              openModal={openModal}
              setInfo={setHistoryInfo}
            />
          ))}
          {historyInfo && (
            <Modal>
              <HistoryModalContents historyInfo={historyInfo} />
            </Modal>
          )}
          <div className="histories-table__pagination">
            <Pagination page={page} setPage={setPage} lastPage={lastPage} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default History;
