import { MouseEvent } from "react";
import Image from "./Image";
import CheckIcon from "../../asset/img/check_icon.svg";
import RedCheckIcon from "../../asset/img/check_icon_red.svg";
import "../../asset/css/Filter.css";

type Props = {
  filterList: {
    name: string;
    type: string;
  }[];
  selectedType: string | null;
  setSelectedType(...args: unknown[]): unknown;
};

const Filter = ({ filterList, selectedType, setSelectedType }: Props) => {
  const onClickFilter = (e: MouseEvent<HTMLButtonElement>) => {
    setSelectedType(e.currentTarget.value);
  };

  return (
    <div className="filter__wrapper">
      <div className="filter__filter-list">
        {filterList?.map(filter => (
          <button
            type="button"
            key={filter.name}
            value={filter.type}
            onClick={onClickFilter}
            className="filter__button"
          >
            <Image
              className="filter__button__icon"
              src={`${selectedType === filter.type ? RedCheckIcon : CheckIcon}`}
              alt={`${filter.name}check`}
            />
            <span
              className={`filter__button__text ${
                selectedType === filter.type
                  ? "font-16-bold color-red"
                  : "font-16 color-a4"
              }`}
            >
              {filter.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Filter;
