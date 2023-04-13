import PropTypes from "prop-types";
import Image from "../utils/Image";
import CheckIcon from "../../img/check_icon.svg";
import RedCheckIcon from "../../img/check_icon_red.svg";
import "../../css/ReservedFilter.css";

const ReservedFilter = ({ filter, setFilter }) => {
  const toggleFilter = type => {
    const newFilter = {};
    Object.keys(filter).forEach(key => {
      if (key === type) newFilter[key] = !filter[key];
      else newFilter[key] = false;
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

ReservedFilter.propTypes = {
  filter: PropTypes.shape({
    isPending: PropTypes.bool,
    isWaiting: PropTypes.bool,
    isExpired: PropTypes.bool,
  }).isRequired,
  setFilter: PropTypes.func.isRequired,
};
