import PropTypes from "prop-types";
import "../../css/Banner.css";

const Banner = ({ img, titleKo, titleEn }) => {
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

Banner.propTypes = {
  img: PropTypes.string.isRequired,
  titleKo: PropTypes.string.isRequired,
  titleEn: PropTypes.string.isRequired,
};

export default Banner;
