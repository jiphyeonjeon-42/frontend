import { useSearchParams } from "react-router-dom";

type CategoryProps = {
  isSelected: boolean;
  name: string;
  count: number;
};

const Category = ({ isSelected, name, count }: CategoryProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const changeFilter = () => {
    searchParams.set("category", name);
    setSearchParams(searchParams);
  };

  return (
    <button
      className={`category-button button-onclick-${isSelected}`}
      type="button"
      onClick={changeFilter}
    >
      <div
        className={`${
          isSelected ? "font-16-bold color-54" : "font-16 color-a4"
        } category-button-text `}
      >
        {name} ({count})
      </div>
    </button>
  );
};

export default Category;
