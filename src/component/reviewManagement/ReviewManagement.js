import React from "react";
import useGetReviews from "../../api/reviews/useGetReviews";
import Banner from "../utils/Banner";
import Tabs from "../utils/Tabs";
import Management from "../utils/Management";
import { managementTabList } from "../../data/tablist";
import ReviewManagementList from "./ReviewManagementList";

const ReviewManagement = () => {
  const { page, setPage, reviewList, lastPage, Dialog } = useGetReviews();
  return (
    <main>
      <Dialog />
      <Banner img="admin" titleKo="유저 관리" titleEn="USER MANAGEMENT" />
      <Tabs tabList={managementTabList} />
      <Management
        searchBarPlaceHolder="도서명이나 닉네임을 검색하세요"
        // TODO: 검색창 처리 필요
        setQuery={() => {}}
        TitleFragement={
          <>
            <span className="review-management__list__id">ID</span>
            <span className="review-management__list__created-at">날짜</span>
            <span className="review-management__list__nickname">작성자</span>
            <span className="review-management__list__contents">리뷰 내용</span>
            <span className="review-management__list__scope">비공개 여부</span>
          </>
        }
        BoxFragement={<ReviewManagementList reviewList={reviewList} />}
        page={page}
        setPage={setPage}
        lastPage={lastPage}
      />
    </main>
  );
};

export default ReviewManagement;
