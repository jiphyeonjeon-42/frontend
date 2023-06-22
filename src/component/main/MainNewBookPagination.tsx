import { MouseEventHandler } from "react";

type Props = {
  page: number;
  setPage: (page: number) => void;
};

const MainNewBookPagination = ({ page, setPage }: Props) => {
  const onChapter: MouseEventHandler<HTMLButtonElement> = e => {
    setPage(+e.currentTarget.value * 5);
  };
  const chapter = [0, 1, 2, 3];
  function isSelected(n: number) {
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
          value={i}
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
