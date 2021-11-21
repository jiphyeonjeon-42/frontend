import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import IMGERR from "../../img/image_onerror.svg";

const MainPopularMain = ({ main }) => {
  function subtituteImg(e) {
    e.target.src = IMGERR;
  }
  return (
    <>
      <div className="main-popular__description color-54">
        <span className="font-16-light color-2d ">#{main.category}</span>
        <span className="font-16-light color-2d margin-16">#{main.author}</span>
        <Link
          to={{
            pathname: `/info/${main.id}`,
            state: {
              bread: "인기 도서",
            },
          }}
        >
          <p className="main-popular__title font-32-bold color-2d">
            {main.title}
          </p>
        </Link>
        <span className="font-16">출판사</span>
        <span className="font-16-light"> | {main.publisher}</span>
        <span className="main-popular__detail font-16">발행연도</span>
        <span className="font-16-light"> | {main.publishedAt}</span>
        <span className="main-popular__detail font-16">표준부호</span>
        <span className="font-16-light"> | {main.isbn}</span>
      </div>
      <Link
        to={{
          pathname: `/info/${main.id}`,
          state: {
            bread: "인기 도서",
          },
        }}
      >
        <div className="main-popular__cover">
          <img
            src={main.image}
            alt={main.title}
            className="main-popular__cover-img"
            onError={subtituteImg}
          />
          <div className="main-popular__cover-more font-20 color-ff">
            도서 자세히 보기
          </div>
        </div>
      </Link>
    </>
  );
};

export default MainPopularMain;

MainPopularMain.propTypes = {
  main: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    author: PropTypes.string,
    publisher: PropTypes.string,
    isbn: PropTypes.string,
    image: PropTypes.string,
    category: PropTypes.string,
    publishedAt: PropTypes.string,
  }).isRequired,
};
