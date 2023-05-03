import Image from "../utils/Image";
import Arr from "../../img/arrow_right_black.svg";
import "../../css/ReturnbookTable.css";

type Props = {
  setLendingId(...args: unknown[]): unknown;
};

const ReturnbookTable = ({
  factor,
  openModal,
  setLendingId,
}: Props) => {
  const openSetModal = () => {
    setLendingId(factor.id);
    openModal();
  };
  const today = new Date();
  const dueDate = new Date(factor.dueDate);
  return (
    <div className="return-book__table-list">
      <div className="return-book__table-list__name font-18-bold color-54">
        {factor.login}
      </div>
      <button
        className="return-book__table-list__button"
        type="button"
        onClick={openSetModal}
      >
        <div className="return-book__table-list__title">
          <span className="return-book__table-list__text color-54">
            {factor.title}
          </span>
          <Image
            className="return-book__table-list__arr"
            src={Arr}
            alt="arrow"
          />
        </div>
        <div className="return-book__table-list__info">
          <span className="re-callSign font-16 color-54">
            청구기호 : {factor.callSign}
          </span>
          <span className="re-dueDate font-16 color-54">
            {`반납예정일 : ${factor.dueDate.slice(0, 10)}`}
          </span>
          <span
            className={`re-penaltyDays font-16-bold ${
              today - dueDate > 0 ? "color-red" : "color-54"
            }`}
          >
            {`${today - dueDate > 0 ? "연체 중" : ""}`}
          </span>
        </div>
      </button>
    </div>
  );
};

export default ReturnbookTable;
