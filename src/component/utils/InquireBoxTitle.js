import React from "react";
import PropTypes from "prop-types";
import "../../css/InquireBoxTitle.css";
import AdminSearchBar from "./AdminSearchBar";

const InquireBoxTitle = ({
  Icon,
  titleKO,
  titleEN,
  KOsize = "font-28-bold",
  ENsize = "font-16",
  placeHolder,
}) => {
  return (
    <div className="inquire-box-title">
      <img
        className={`inquire-box-title__icon ${placeHolder && "short"}`}
        src={Icon}
        alt="icon"
      />
      <span
        className={`inquire-box-title__text ${placeHolder && "short"} color-ff`}
      >
        <span className={`inquire-box-title__kr ${KOsize}`}>{titleKO}</span>
        <span className={`inquire-box-title__en ${ENsize}`}>{titleEN}</span>
      </span>
      {placeHolder ? (
        <AdminSearchBar placeHolder={placeHolder} width="short" />
      ) : null}
    </div>
  );
};

InquireBoxTitle.propTypes = {
  Icon: PropTypes.string.isRequired,
  titleKO: PropTypes.string.isRequired,
  titleEN: PropTypes.string.isRequired,
  // eslint-disable-next-line react/require-default-props
  KOsize: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  ENsize: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  placeHolder: PropTypes.string,
};

export default InquireBoxTitle;
