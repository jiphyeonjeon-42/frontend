import SearchIcon from "~/asset/img/search_icon_black.svg";
import Image from "~/component/utils/Image";

const SearchBarButton = () => {
  return (
    <button className="search-bar__button" type="submit" aria-label="검색">
      <Image className="search-bar__button" src={SearchIcon} alt="" />
    </button>
  );
};

export default SearchBarButton;
