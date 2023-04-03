import { useState } from "react";
import ReservedFilter from "./ReservedFilter";
import ReservedTableList from "./ReservedTableList";
import ReservedModalContents from "./ReservedModalContents";
import Tabs from "../utils/Tabs";
import Banner from "../utils/Banner";
import Pagination from "../utils/Pagination";
import InquireBoxTitle from "../utils/InquireBoxTitle";
import useModal from "../../hook/useModal";
import { rentTabList } from "../../data/tablist";
import Reserve from "../../img/list-check-solid.svg";
import "../../css/ReservedLoan.css";
import useGetReservationsSearch from "../../api/reservations/useGetReservationsSearch";

const ReservedLoan = () => {
  const [reservedInfo, setReservedInfo] = useState(null);
  const { setOpen: openModal, setClose: closeModal, Modal } = useModal();

  const {
    reservedLoanList,
    lastPage,
    page,
    setPage,
    setQuery,
    filter,
    setFilter,
    Dialog,
  } = useGetReservationsSearch();

  return (
    <main>
      <Dialog />
      <Banner img="admin" titleKo="예약 대출" titleEn="BOOK RESERVATION" />
      <Tabs tabList={rentTabList} />
      <section className="reserved-loan-body">
        <div className="inquire-box-wrapper">
          <InquireBoxTitle
            Icon={Reserve}
            titleKO="예약 정보"
            titleEN="Reservation info"
            placeHolder="예약 대출자의 성명 혹은 도서명을 입력해주세요."
            setQuery={setQuery}
          />
        </div>
        <div className="reserved-loan-table__inquire-box">
          <div className="reserved-loan-filter">
            <ReservedFilter filter={filter} setFilter={setFilter} />
          </div>
          {reservedLoanList.map(factor => (
            <ReservedTableList
              key={factor.id}
              isPending={filter.isPending}
              isWaiting={filter.isWaiting}
              isExpired={filter.isExpired}
              isAll={
                !(filter.isPending || filter.isWaiting || filter.isExpired)
              }
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
            <Pagination page={page} setPage={setPage} lastPage={lastPage} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default ReservedLoan;
