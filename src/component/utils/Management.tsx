import ManagementSearchBar from "./ManagementSearchBar";
import Pagination from "./Pagination";
import "../../asset/css/Management.css";

type Props = {
  searchBarPlaceHolder: string;
  setQuery: (query: string) => void;
  TitleFragement: React.ReactNode[] | React.ReactNode;
  BoxFragement: React.ReactNode[] | React.ReactNode;
  page: number;
  setPage: (page: number) => void;
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
      <ManagementSearchBar
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
