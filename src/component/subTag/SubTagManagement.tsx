import { otherManagementTabList } from "../../data/tablist";
import { useGetTags } from "../../api/tags/useGetTags";
import Filter from "../utils/Filter";
import Banner from "../utils/Banner";
import Tabs from "../utils/Tabs";
import Management from "../utils/Management";
import SubTagManagementList from "./SubTagManagementList";
import "../../css/SubTagManagement.css";

const visibiltyFilterList = [
  { name: "공개만 보기", type: "public" },
  { name: "비공개만 보기", type: "private" },
];

const SubTagManagement = () => {
  const { page, lastPage, setPage, setQuery, filter, setFilter, list } =
    useGetTags();

  return (
    <main>
      <Banner
        img="admin"
        titleKo="도서별 태그 관리"
        titleEn="BOOK TAG MANAGEMENT"
      />
      <Tabs tabList={otherManagementTabList} />
      <Management
        searchBarPlaceHolder="태그를 확인할 도서명을 입력하세요"
        setQuery={setQuery}
        TitleFragement={
          <>
            <span className="sub-tag-management__id">ID</span>
            <span className="sub-tag-management__title">도서명</span>
            <span className="sub-tag-management__created-at">날짜</span>
            <span className="sub-tag-management__nickname">작성자</span>
            <span className="sub-tag-management__content">태그</span>
            <span className="sub-tag-management__merged">병합 여부</span>
            <span className="sub-tag-management__visibility">비공개 여부</span>
          </>
        }
        BoxFragement={
          <>
            <Filter
              filterList={visibiltyFilterList}
              selectedType={filter}
              setSelectedType={setFilter}
            />
            <SubTagManagementList tagList={list} />
          </>
        }
        page={page}
        setPage={setPage}
        lastPage={lastPage}
      ></Management>
    </main>
  );
};

export default SubTagManagement;
