import { useLocation } from "react-router-dom";
import { useGetSearchKeyword } from "~/api/searchKeyword/useGetSearchKeyword";
import { adminLnbMenu } from "~/constant/headerMenu";
import SearchRankingList from "~/component/utils/SearchRankingList";
import "~/asset/css/searchRanking.css";

const SearchRanking = () => {
  const isAdminPath = adminLnbMenu.some(
    menu => menu.linkTo === useLocation().pathname,
  );
  if (isAdminPath) {
    return null;
  }
  const { keywords } = useGetSearchKeyword();
  if (keywords.length === 0) {
    return null;
  }

  return <SearchRankingList list={keywords} />;
};

export default SearchRanking;
