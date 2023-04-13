import { useSearchParams } from "react-router-dom";
import Image from "./Image";
import ArrRight from "../../img/arrow_right_black.svg";
import ArrRightDouble from "../../img/arrow_right_black_double.svg";
import "../../css/Pagination.css";

type PaginationProps = {
  className?: string;
  page: number;
  setPage(...args: unknown[]): unknown;
  lastPage: number;
  isReplaceUrl?: boolean;
  scrollRef?: (...args: unknown[]) =>
    | unknown
    | {
        current?: Element;
      };
  count?: number;
};

const Pagination = ({
  className,
  page,
  setPage,
  lastPage,
  isReplaceUrl,
  scrollRef,
  count,
}: PaginationProps) => {
  const startNum = Math.floor((page - 1) / count) * count + 1;
  const pageRange = [];
  for (let i = 0; i < count; i += 1) {
    if (startNum + i <= lastPage) pageRange.push(startNum + i);
  }
  const isPrevAvailable = page > 1;
  const isNextAvailable = page < lastPage;
  const [searchParams, setSearchParams] = useSearchParams();

  const changePage = newPage => {
    setPage(newPage);
    if (isReplaceUrl) {
      searchParams.set("page", newPage);
      setSearchParams(searchParams);
      scrollRef?.current.scrollIntoView(); // 페이지 전환시 돔이 참조하고 있는 곳으로 현재 스크롤 이동
    }
  };
  const onClickPage = e => {
    const { value } = e.currentTarget;
    changePage(parseInt(value, 10));
  };

  const onClickPageRange = e => {
    const type = e.currentTarget.value;
    if (type === "previous" && page > 1) changePage(page - 1);
    else if (type.includes("prev")) changePage(1);
    else if (type === "next" && page < lastPage) changePage(page + 1);
    else if (type.includes("next")) changePage(lastPage);
  };

  return (
    <div className={`pagination ${className}`}>
      {/* 왼쪽으로 넘기기 버튼 */}
      <div className="pagination__page-ranges">
        {isPrevAvailable && (
          <>
            <button
              type="button"
              className="pagination__page-range-button double reverse"
              value="previousStart"
              onClick={onClickPageRange}
            >
              <Image
                className="reverse double"
                src={ArrRightDouble}
                alt="go to first page range"
              />
            </button>
            <button
              className="pagination__page-range-button reverse"
              type="button"
              value="previous"
              onClick={onClickPageRange}
            >
              <Image
                className="reverse"
                src={ArrRight}
                alt="go to previous page range"
              />
            </button>
          </>
        )}
      </div>
      {/* 페이지 번호 */}
      <div className="pagination__pages">
        {pageRange.map(pageNum => (
          <button
            type="button"
            key={pageNum}
            value={pageNum}
            onClick={onClickPage}
            className={`pagination__page-button font-20 ${
              page === pageNum ? "color-54" : "color-a4"
            }`}
          >
            {pageNum}
          </button>
        ))}
      </div>

      {/* 오른쪽으로 넘기기 버튼 */}
      <div className="pagination__page-ranges">
        {isNextAvailable && (
          <>
            <button
              type="button"
              className="pagination__page-range-button"
              value="next"
              onClick={onClickPageRange}
            >
              <Image src={ArrRight} alt="go to next page range" />
            </button>
            <button
              className="pagination__page-range-button double"
              type="button"
              value="nextLast"
              onClick={onClickPageRange}
            >
              <Image
                className="double"
                src={ArrRightDouble}
                alt="go to last page range"
              />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Pagination;

Pagination.defaultProps = {
  className: "",
  isReplaceUrl: false,
  scrollRef: undefined,
  count: 5,
};
