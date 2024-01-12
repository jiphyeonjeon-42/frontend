import { useGetReviews } from "../../api/reviews/useGetReviews";
import { otherManagementTabList } from "../../constant/tablist";
import Banner from "../utils/Banner";
import Filter from "../utils/Filter";
import Management from "../utils/Management";
import Tabs from "../utils/Tabs";
import ReviewManagementListItem from "./ReviewManagementListItem";

type Visibility = "all" | "public" | "hidden";

const reviewFilterList = [
  { name: "공개만 보기", type: "public" },
  { name: "비공개만 보기", type: "hidden" },
] satisfies { name: string; type: Visibility }[];

const ReviewManagement = () => {
  const { page, setPage, data, visibility, setVisibility, setSearch } =
    useGetReviews();

  const setVisiblityWithUnset = (value: "public" | "hidden") => {
    setVisibility(visibility === value ? "all" : value);
  };

  return (
    <main>
      <Banner img="admin" titleKo="리뷰 관리" titleEn="REVIEW MANAGEMENT" />
      <Tabs tabList={otherManagementTabList} />
      <Management
        searchBarPlaceHolder="도서명이나 닉네임을 검색하세요"
        setQuery={setSearch}
        TitleFragement={
          <>
            <span className="review-management__list__id">ID</span>
            <span className="review-management__list__created-at">날짜</span>
            <span className="review-management__list__nickname">작성자</span>
            <span className="review-management__list__contents">리뷰 내용</span>
            <span className="review-management__list__scope">비공개 여부</span>
          </>
        }
        BoxFragement={
          <>
            <Filter
              filterList={reviewFilterList}
              selectedType={visibility}
              setSelectedType={setVisiblityWithUnset as (_: string) => void}
            />
            {data?.items.map(review => (
              <ReviewManagementListItem review={review} />
            ))}
          </>
        }
        page={page}
        setPage={setPage}
        lastPage={data?.meta.totalPages ?? 1}
      />
    </main>
  );
};

export default ReviewManagement;
