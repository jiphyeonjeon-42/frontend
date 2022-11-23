/* eslint-disable react/prop-types */
import React from "react";
import "../../css/ReturnBookFilter.css";

const FilterButton = ({ type, typeName, setType }) => {
  return (
    <button
      type="button"
      onClick={() => {
        setType(typeName);
      }}
      className="proceeding filter-button"
    >
      <span
        className={`proceeding-finsh__text ${
          type === typeName ? "font-16-bold color-54" : "font-16 color-a4"
        }`}
      >
        {typeName}
      </span>
    </button>
  );
};

const HistoryFilter = ({ type, setType }) => {
  return (
    <div className="return-filter">
      <div className="return-filter-wrapper">
        <FilterButton type={type} typeName="user" setType={setType} />
        <FilterButton type={type} typeName="title" setType={setType} />
        <FilterButton type={type} typeName="callsign" setType={setType} />
        <FilterButton type={type} typeName="bookId" setType={setType} />
      </div>
    </div>
  );
};

export default HistoryFilter;
