import PaginationCircle from "~/component/utils/PaginationCircle";

type Props = {
  page: number;
  setPage: (page: number) => void;
};
/*
 * 신작도서를 5권씩 4챕터로 나누어서 표시
 * page: 1 ~ 20
 * chapter: 1 ~ 4
 */
const pageSize = 5;
const chapterSize = 4;

const MainNewBookPagination = ({ page, setPage }: Props) => {
  const currentChapter = Math.ceil(page / pageSize);
  const setCurrentChapter = (chapter: number) => setPage(chapter * pageSize);

  return (
    <PaginationCircle
      className="main-new__books_pagination"
      page={currentChapter}
      setPage={setCurrentChapter}
      lastPage={chapterSize - 1}
    />
  );
};

export default MainNewBookPagination;
