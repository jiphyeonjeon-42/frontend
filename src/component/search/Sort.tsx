import "../../css/Sort.css";

type SortProps = {
  sort: string;
  setSort(...args: unknown[]): unknown;
};

const Sort = ({ sort, setSort }: SortProps) => {
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

export default Sort;
