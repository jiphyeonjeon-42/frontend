import "../../asset/css/ReturnBookFilter.css";

type Props = {
  lendingSort: boolean;
  setLendingSort: (sort: boolean) => void;
};
const ReturnBookFilter = ({ lendingSort, setLendingSort }: Props) => {
  return (
    <div className="return-filter">
      <div className="return-filter-wrapper">
        <button
          type="button"
          onClick={() => setLendingSort(true)}
          className="proceeding filter-button"
        >
          <span
            className={`proceeding-finsh__text ${
              lendingSort ? "font-16-bold color-54" : "font-16 color-a4"
            }`}
          >
            최신순
          </span>
        </button>
        <button
          type="button"
          onClick={() => setLendingSort(false)}
          className="finish filter-button"
        >
          <span
            className={`proceeding-finsh__text ${
              lendingSort ? "font-16 color-a4" : "font-16-bold color-54"
            }`}
          >
            연체순
          </span>
        </button>
      </div>
    </div>
  );
};

export default ReturnBookFilter;
