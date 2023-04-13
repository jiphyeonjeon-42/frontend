/* eslint-disable react/prop-types */
import Image from "../utils/Image";
import CheckIcon from "../../img/check_icon.svg";
import RedCheckIcon from "../../img/check_icon_red.svg";
import "../../css/HistoriesFilter.css";

const FilterButton = ({ type, typeName, setType }) => {
  const onClickFilter = () => {
    const isSelected = type === typeName;
    setType(isSelected ? "" : typeName);
  };

  return (
    <button
      type="button"
      onClick={onClickFilter}
      className="proceeding filter-button"
    >
      <Image
        className="filter__icon"
        src={`${type === typeName ? RedCheckIcon : CheckIcon}`}
        alt="check"
      />
      <span
        className={`proceeding-finsh__text ${
          type === typeName ? "font-16-bold color-red" : "font-16 color-a4"
        }`}
      >
        {typeName}
      </span>
    </button>
  );
};

const HistoryFilter = ({ type, setType }) => {
  return (
    <div className="histories-filter">
      <div className="histories-filter-wrapper">
        <FilterButton type={type} typeName="user" setType={setType} />
        <FilterButton type={type} typeName="title" setType={setType} />
      </div>
    </div>
  );
};

export default HistoryFilter;
