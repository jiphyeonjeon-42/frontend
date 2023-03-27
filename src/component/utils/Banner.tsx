import React from "react";
import "../../css/Banner.css";

type Props = {
  img: string;
  titleKo: string;
  titleEn: string;
};

const Banner = ({ img, titleKo, titleEn }: Props) => {
  return (
    <section className={`banner ${img}-img`}>
      <div className="banner-wrapper">
        <div className="banner__title">
          <span className="banner__title__ko color-ff font-48-bold">
            {titleKo}
          </span>
          <span className="banner__title__en color-d5 font-16">{titleEn}</span>
        </div>
      </div>
    </section>
  );
};

export default Banner;
