import { type SearchKeyword } from "~/type/SearchKeyword";

type Props = { item: SearchKeyword & { id: number }; height: number };

const SearchRankingItem = ({ item, height }: Props) => {
  const changeWord = (() => {
    if (item.rankingChange === null) return "new";
    if (item.rankingChange > 0) return "▲";
    if (item.rankingChange < 0) return "▼";
    return "-";
  })();

  return (
    <div
      className="search-ranking__keyword__wrapper"
      style={{ height: height, flexBasis: height }}
    >
      <p className="search-ranking__keyword__rank">{item.id}</p>
      <p className="search-ranking__keyword__keyword">{item.searchKeyword}</p>
      <p className={`search-ranking__keyword__change ${changeWord}`}>
        {changeWord}
      </p>
    </div>
  );
};

export default SearchRankingItem;
