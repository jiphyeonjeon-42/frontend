import { Lending } from "../../type";
import { dateFormat, dateLessThan } from "../../util/date";
import Image from "../utils/Image";
import Arr from "../../asset/img/arrow_right_black.svg";
import "../../asset/css/ReturnbookTable.css";

type Props = {
  lending: Lending;
  openModal: () => void;
  setLendingId: (id: number) => void;
};

const ReturnbookTable = ({ lending, openModal, setLendingId }: Props) => {
  const openSetModal = () => {
    setLendingId(lending.id);
    openModal();
  };

  return (
    <div className="return-book__table-list">
      <div className="return-book__table-list__name font-18-bold color-54">
        {lending.login}
      </div>
      <button
        className="return-book__table-list__button"
        type="button"
        onClick={openSetModal}
      >
        <div className="return-book__table-list__title">
          <span className="return-book__table-list__text color-54">
            {lending.title}
          </span>
          <Image
            className="return-book__table-list__arr"
            src={Arr}
            alt="arrow"
          />
        </div>
        <div className="return-book__table-list__info">
          <span className="re-callSign font-16 color-54">
            청구기호 : {lending.callSign}
          </span>
          <span className="re-dueDate font-16 color-54">
            {`반납예정일 : ${dateFormat(lending.dueDate)}`}
          </span>
          <span
            className={`re-penaltyDays font-16-bold ${
              dateLessThan(lending.dueDate) ? "color-red" : "color-54"
            }`}
          >
            {`${dateLessThan(lending.dueDate) ? "연체 중" : ""}`}
          </span>
        </div>
      </button>
    </div>
  );
};

export default ReturnbookTable;
