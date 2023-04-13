import PropTypes from "prop-types";
import "../../css/Sort.css";

const Sort = ({ sort, setSort }) => {
  const sortInfo = [
    { key: "title", name: "이름순" },
    { key: "new", name: "최신순" },
    { key: "popular", name: "인기순" },
  ];
  return (
    <div className="sort-by">
      {sortInfo.map(item => {
        return (
          <button
            type="button"
            onClick={() => setSort(item.key)}
            className={`sort-by__button ${
              sort === item.key ? "font-16-bold color-54" : "font-16 color-a4"
            }`}
          >
            {item.name}
          </button>
        );
      })}
    </div>
  );
};

Sort.propTypes = {
  sort: PropTypes.string.isRequired,
  setSort: PropTypes.func.isRequired,
};

export default Sort;
