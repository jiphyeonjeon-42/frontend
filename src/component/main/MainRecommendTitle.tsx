import { ChangeEventHandler, Dispatch, SetStateAction } from "react";

type Props = {
  description: string;
  options: string[];
  setOptions: Dispatch<SetStateAction<string[]>>;
};
const MainRecommendTitle = ({ options, setOptions, description }: Props) => {
  const changeOption: ChangeEventHandler<HTMLSelectElement> = e => {
    console.log(e.currentTarget.value);
    // TODO: 옵션 변경때마다 API 호출
    // "0서클 | ft_printf" => | 기준으로 split해서 request 보내야 함
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
