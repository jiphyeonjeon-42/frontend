import BookSearchBar from "../utils/BookSearchBar";
import "../../asset/css/Banner.css";
import "../../asset/css/MainBanner.css";

const MainBanner = () => {
  return (
    <section className="banner main-img">
      <div className="main-banner">
        <div className="main-banner__space" />
        <div className="main-banner__wrapper">
          <div className="main-banner__line" />
          <div className="main-banner__greet font-48-bold color-ff">
            어서오세요, 집현전입니다.
          </div>
          <span className="main-banner__guide1 font-16 color-d5">
            집현전에 원하는 책이 있다면, 검색창에 도서를 입력해주세요.
          </span>
          <span className="main-banner__guide2 font-16 color-d5">
            검색창에 원하는 도서를 입력해주세요.
          </span>
          <BookSearchBar />
        </div>
        <div className="main-banner__scroll">
          <p className="font-12 color-d5">스크롤을 내려주세요</p>
          <div className="main-banner__mouse" />
        </div>
      </div>
    </section>
  );
};

export default MainBanner;
