import React from "react";
import PHOTO from "../img/photo.jpg";
import "../css/Banner.css";

const Banner = () => {
  return (
    <div className="banner">
      <img src={PHOTO} className="banner__photo" alt="jiphyeonjeon" />
      <div className="banner__cover" />
    </div>
  );
};

export default Banner;
