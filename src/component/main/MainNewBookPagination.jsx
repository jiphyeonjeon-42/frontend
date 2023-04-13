import PropTypes from "prop-types";

const MainNewBookPagination = ({ page, setPage }) => {
  const onChapter = e => {
    setPage(e.target.innerText * 5);
  };
  const chapter = [0, 1, 2, 3];
  function isSelected(n) {
    if (Math.floor(page / 5) === n) return true;
    if (Math.floor(page / 5) === 4 && !n) return true;
    return false;
  }
  return (
    <div className="main-new__books_pagination">
      {chapter.map(i => (
        <button
          key={i}
          type="button"
          className={`${
            isSelected(i) && "selected"
          } main-new__books_pag_circle`}
          onClick={onChapter}
        >
          {i}
        </button>
      ))}
    </div>
  );
};

export default MainNewBookPagination;

MainNewBookPagination.propTypes = {
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};
