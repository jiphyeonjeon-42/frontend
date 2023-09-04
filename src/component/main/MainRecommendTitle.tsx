import { ChangeEventHandler, Dispatch, SetStateAction } from "react";

type Props = {
  description: string;
  options: string[];
  setSelectedOption: (option: string) => void;
};
const MainRecommendTitle = ({
  description,
  options,
  setSelectedOption,
}: Props) => {
  const changeOption: ChangeEventHandler<HTMLSelectElement> = e => {
    setSelectedOption(e.target.selectedOptions[0].value);
  };

  return (
    <div className="main__recommend__title__wrapper subtitle-start">
      <div className="subtitle__line" />
      <h3 className="main__recommend__title__title subtitle__title">
        <span>추천도서</span>
        <select
          className="main__recommend__title__select"
          onChange={changeOption}
        >
          {options.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </h3>
      <span className="main-recommend__title__description subtitle__description">
        {description}
      </span>
    </div>
  );
};

export default MainRecommendTitle;
