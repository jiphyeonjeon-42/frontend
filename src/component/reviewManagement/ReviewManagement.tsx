import { useGetReviews } from "../../api/reviews/useGetReviews";
import { otherManagementTabList } from "../../constant/tablist";
import Banner from "../utils/Banner";
import Tabs from "../utils/Tabs";
import Management from "../utils/Management";
import ReviewManagementList from "./ReviewManagementList";
import Filter from "../utils/Filter";

const reviewFilterList = [
  { name: "공개만 보기", type: "0" },
  { name: "비공개만 보기", type: "1" },
];

const ReviewManagement = () => {
  const {
    page,
    setPage,
    setQuery,
    selectedType,
    setSelectedType,
    reviewList,
    lastPage,
    Dialog,
  } = useGetReviews();

  const setUndefinedReSelected = (newType: string) => {
    setSelectedType(newType === selectedType ? undefined : newType);
  };

  return (
    <main>
      <Dialog />
      <Banner img="admin" titleKo="리뷰 관리" titleEn="REVIEW MANAGEMENT" />
      <Tabs tabList={otherManagementTabList} />
      <Management
        searchBarPlaceHolder="도서명이나 닉네임을 검색하세요"
        setQuery={setQuery}
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
              selectedType={selectedType}
              setSelectedType={setUndefinedReSelected}
            />
            <ReviewManagementList reviewList={reviewList} />
          </>
        }
        page={page}
        setPage={setPage}
        lastPage={lastPage}
      />
    </main>
  );
};

export default ReviewManagement;
