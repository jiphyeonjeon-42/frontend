import { RefObject, memo } from "react";
import { useSearchParams } from "react-router-dom";
import Paginations from "~/component/utils/Paginations";

type Props = {
  className?: string;
  page: number;
  setPage: (page: number) => void;
  lastPage: number;
  isReplaceUrl?: boolean;
  scrollRef?: RefObject<HTMLDivElement>;
  count?: number;
};

const Pagination = ({
  className = "",
  page,
  setPage,
  lastPage,
  isReplaceUrl = false,
  scrollRef,
  count = 5,
}: Props) => {
  const isPrevAvailable = page > 1;
  const isNextAvailable = page < lastPage;
  const [searchParams, setSearchParams] = useSearchParams();

  const changePage = (newPage: number) => {
    setPage(newPage);
    if (isReplaceUrl) {
      searchParams.set("page", `${newPage}`);
      setSearchParams(searchParams);
      if (scrollRef?.current) scrollRef.current.scrollIntoView(); // 페이지 전환시 돔이 참조하고 있는 곳으로 현재 스크롤 이동
    }
  };

  return (
    <Paginations.Root
      page={page}
      setPage={changePage}
      lastPage={lastPage}
      className={className}
    >
      <Paginations.ConditionalMove isVisible={isPrevAvailable}>
        <Paginations.First />
        <Paginations.Prev />
      </Paginations.ConditionalMove>
      <Paginations.Pages length={count} />
      <Paginations.ConditionalMove isVisible={isNextAvailable}>
        <Paginations.Next />
        <Paginations.Last />
      </Paginations.ConditionalMove>
    </Paginations.Root>
  );
};

export default memo(Pagination);
