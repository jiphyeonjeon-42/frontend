import PropTypes from "prop-types";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import "../../css/Management.css";

const Management = ({
  searchBarPlaceHolder,
  setQuery,
  TitleFragement,
  BoxFragement,
  page,
  setPage,
  lastPage,
}) => {
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

Management.propTypes = {
  searchBarPlaceHolder: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
  TitleFragement: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  BoxFragement: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  lastPage: PropTypes.number.isRequired,
};
