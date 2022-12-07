import React from "react";
import PropTypes from "prop-types";
import Image from "./Image";
import CheckIcon from "../../img/check_icon.svg";
import RedCheckIcon from "../../img/check_icon_red.svg";
import "../../css/Filter.css";

const Filter = ({ filterList, selectedType, setSelecetedType }) => {
  const onClickFilter = e => {
    const clickedType = e.currentTarget.value;
    const isSelected = selectedType === clickedType;
    setSelecetedType(isSelected ? undefined : clickedType);
  };

  return (
    <div className="filter__wrapper">
      <div className="filter__filter-list">
        {filterList?.map(filter => (
          <button
            type="button"
            key={filter.name}
            value={filter.type}
            onClick={onClickFilter}
            className="filter__button"
          >
            <Image
              className="filter__button__icon"
              src={`${selectedType === filter.type ? RedCheckIcon : CheckIcon}`}
              alt={`${filter.name}check`}
            />
            <span
              className={`filter__button__text ${
                selectedType === filter.type
                  ? "font-16-bold color-red"
                  : "font-16 color-a4"
              }`}
            >
              {filter.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Filter;

Filter.propTypes = {
  filterList: PropTypes.arrayOf({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  selectedType: PropTypes.string.isRequired,
  setSelecetedType: PropTypes.func.isRequired,
};
