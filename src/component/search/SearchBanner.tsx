import BookSearchBar from "../utils/BookSearchBar";
import "../../asset/css/Banner.css";
import "../../asset/css/SearchBanner.css";

type Props = {
  setQuery: (query: string) => void;
};

const SearchBanner = ({ setQuery }: Props) => {
  return (
    <section className="banner search-img">
      <section className="search-banner">
        <div className="banner__title">
          <span className="search-banner__title__ko color-ff font-48-bold">
            검색
          </span>
          <span className="search-banner__title__en color-d5 font-16">
            SEARCH
          </span>
        </div>
        <BookSearchBar />
      </section>
    </section>
  );
};

export default SearchBanner;
