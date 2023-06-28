import SearchBar from "../utils/SearchBar";
import "../../asset/css/Banner.css";
import "../../asset/css/SearchBanner.css";

type Props = {
  setQuery(...args: unknown[]): unknown;
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
        <SearchBar
          setQuery={setQuery}
          width="banner"
          isFocusedOnMount={false}
        />
      </section>
    </section>
  );
};

export default SearchBanner;
