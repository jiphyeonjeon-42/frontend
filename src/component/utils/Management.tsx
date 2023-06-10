import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import "../../css/Management.css";

type Props = {
  searchBarPlaceHolder: string;
  setQuery(...args: unknown[]): unknown;
  TitleFragement: React.ReactNode[] | React.ReactNode;
  BoxFragement: React.ReactNode[] | React.ReactNode;
  page: number;
  setPage(...args: unknown[]): unknown;
  lastPage: number;
};

const Management = ({
  searchBarPlaceHolder,
  setQuery,
  TitleFragement,
  BoxFragement,
  page,
  setPage,
  lastPage,
}: Props) => {
  return (
    <section className="management__wrapper">
      <SearchBar
        placeHolder={searchBarPlaceHolder}
        width="center"
        wrapperClassName="management__search-bar"
        setQuery={setQuery}
      />
      <div className="management__list">
        <div className="management__list__box-title">{TitleFragement}</div>
        <div className="management__list__box">
          {BoxFragement}
          <Pagination page={page} setPage={setPage} lastPage={lastPage} />
        </div>
      </div>
    </section>
  );
};

export default Management;
