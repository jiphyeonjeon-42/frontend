/* eslint-disable react/prop-types */
import React from "react";
// import SearchBar from "./SearchBar";
import "../css/InquireBoxTitle.css";

const InquireBoxTitle = ({ Icon, titleKO, titleEN, Search }) => {
  return (
    <div className="inquire-box-title">
      <img className="inquire-box-title__icon" src={Icon} alt="icon" />
      <span className="font-28-bold color-ff">
        <span className="font-28-bold">{titleKO}</span>
        <span className="inquire-box-title__en font-16">{titleEN}</span>
      </span>
      {Search}
    </div>
  );
};

export default InquireBoxTitle;
