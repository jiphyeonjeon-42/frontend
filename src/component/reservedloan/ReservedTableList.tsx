import Image from "../utils/Image";
import Arr from "../../img/arrow_right_black.svg";
import "../../css/ReservedTableList.css";
import { Book, Lending, Reservation } from "../../types";

type Props = {
  isPending: boolean;
  isWaiting: boolean;
  isExpired: boolean;
  isAll: boolean;
  openModal: () => void;
  factor: Reservation;
  setInfo: (book: Reservation) => void;
};

const ReservedTableList = ({
  isPending,
  isWaiting,
  isExpired,
  isAll,
  factor,
  openModal,
  setInfo,
}: Props) => {
  const openSetModal = () => {
    setInfo(factor);
    openModal();
  };

  const printEndReason = (status: number) => {
    if (status === 1) return "대출 완료";
    if (status === 2) return "예약 취소";
    return "예약 기한 만료";
  };

  return (
    <div className="reserved-loan__table-list">
      <div className="reserved-loan__table-list__name font-18-bold color-54">
        {factor?.login}
      </div>
      <button
        className="reserved-loan__table-list__button"
        type="button"
        onClick={openSetModal}
      >
        <div className="reserved-loan__table-list__title">
          <span className="reserved-loan__table-list__text color-54">
            {factor?.title}
          </span>
          <Image
            className="reserved-loan__table-list__arr"
            src={Arr}
            alt="arrow"
          />
        </div>
        <div className="reserved-loan__table-list__info">
          {factor?.callSign && (isPending || isAll) ? (
            <span className="reserved-loan__table-list__call-sign font-16 color-54">
              {`청구기호 : ${factor.callSign}`}
            </span>
          ) : (
            ""
          )}
          <span className="font-16 color-54">
            {factor && !factor.status && factor.endAt && (isPending || isAll)
              ? `예약 만료일 : ${factor.endAt.slice(0, 10)}`
              : null}
            {factor && !factor.status && !factor.endAt && (isWaiting || isAll)
              ? `예약 시작일 : ${factor.createdAt.slice(0, 10)}`
              : null}
            {factor?.status && (isExpired || isAll)
              ? `예약 만료 이유 : ${printEndReason(factor.status)}`
              : null}
          </span>
        </div>
      </button>
    </div>
  );
};

export default ReservedTableList;
