import Image from "../utils/Image";
import CheckIcon from "../../asset/img/check_icon.svg";
import RedCheckIcon from "../../asset/img/check_icon_red.svg";
import "../../asset/css/ReservedFilter.css";

type Props = {
  filter: {
    isPending?: boolean;
    isWaiting?: boolean;
    isExpired?: boolean;
  };
  setFilter(...args: unknown[]): unknown;
};

const ReservedFilter = ({ filter, setFilter }: Props) => {
  const toggleFilter = (type: "isPending" | "isWaiting" | "isExpired") => {
    const newFilter = {
      isPending: false,
      isWaiting: false,
      isExpired: false,
    };
    Object.keys(filter).forEach(key => {
      if (key === type) newFilter[key] = !filter[key];
    });
    setFilter(newFilter);
  };

  return (
    <div className="reserved-filter">
      <div className="reserved-filter-wrapper">
        <button
          type="button"
          onClick={() => toggleFilter("isPending")}
          className="proceeding filter-button"
        >
          <Image
            className="filter__icon"
            src={`${filter.isPending ? RedCheckIcon : CheckIcon}`}
            alt="check"
          />
          <span
            className={`proceeding-finish__text ${
              filter.isPending ? "color-red" : "color-a4"
            }`}
          >
            예약 0순위
          </span>
        </button>
        <button
          type="button"
          onClick={() => toggleFilter("isWaiting")}
          className="finish filter-button"
        >
          <Image
            className="filter__icon"
            src={`${filter.isWaiting ? RedCheckIcon : CheckIcon}`}
            alt="check"
          />
          <span
            className={`proceeding-finish__text ${
              filter.isWaiting ? "color-red" : "color-a4"
            }`}
          >
            예약 후순위
          </span>
        </button>
        <button
          type="button"
          onClick={() => toggleFilter("isExpired")}
          className=" finish filter-button "
        >
          <Image
            className="filter__icon"
            src={`${filter.isExpired ? RedCheckIcon : CheckIcon}`}
            alt="check"
          />
          <span
            className={`proceeding-finish__text ${
              filter.isExpired ? "color-red" : "color-a4"
            }`}
          >
            종료된 예약
          </span>
        </button>
      </div>
    </div>
  );
};

export default ReservedFilter;
