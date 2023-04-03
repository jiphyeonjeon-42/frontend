/* eslint-disable react/prop-types */
import Image from "../utils/Image";
import Arr from "../../img/arrow_right_black.svg";
import "../../css/HistoryTable.css";

const HistoryTable = ({ history, openModal, setInfo }) => {
  const openSetModal = () => {
    setInfo(history);
    openModal();
  };

  return (
    <div className="histories__table-list">
      <span className="histories__table-list__name font-16-bold color-54">
        {history?.login}
      </span>
      <button
        className="histories__table-list__button"
        type="button"
        onClick={openSetModal}
      >
        <div className="histories__table-list__title color-54">
          {history?.title}
          <span className="histories-callSign font-16 color-54">
            {history?.callSign}
          </span>
          <Image className="histories__table-list__arr" src={Arr} alt="arrow" />
        </div>
        <div className="histories__table-list_date_wrapper">
          <div className="histories__table-list__info color-54">
            <span className="histories__table-list__text">
              {history?.createdAt}
            </span>
            <span className="histories__table-list__text">
              {history?.lendingLibrarianNickName}
            </span>
            <span />
            <span className="histories__table-list__text">
              {history?.lendingCondition}
            </span>
          </div>
          {history?.returnedAt && (
            <div className="histories__table-list__info color-54">
              <span className="histoies__table-list__text">
                {history?.returnedAt}
              </span>
              <span className="histoies__table-list__text">
                {history?.returningLibrarianNickname}
              </span>
              <span />
              <span className="histoies__table-list__text">
                {history?.returningCondition}
              </span>
            </div>
          )}
        </div>
      </button>
    </div>
  );
};

export default HistoryTable;

HistoryTable.propTypes = {};
