import { useEffect } from "react";
import useApi from "../../hook/useApi";
import { useSearch } from "../../hook/useSearch";

type Props = {
  setLendingId: (id: number) => void;
  openModal: () => void;
  setOpenTitleAndMessage: (title: string, message: string) => void;
};

const useGetLendingsSearchId = ({
  setLendingId,
  openModal,
  setOpenTitleAndMessage,
}: Props) => {
  const { searchParams, setQuery } = useSearch();
  const { request } = useApi("get", "lendings/search", {
    query: searchParams.query,
    type: "bookId",
  });

  const refineResponse = (response: any) => {
    const result = response.data?.items;
    if (result && result?.length > 0 && result[0]?.id !== undefined) {
      setLendingId(result[0].id);
      openModal();
    } else
      setOpenTitleAndMessage(
        "책을 다시 한번 확인해주세요.",
        "해당책의 대출기록이 없습니다.",
      );
  };

  useEffect(() => {
    if (searchParams.query) request(refineResponse);
  }, [searchParams]);
  return {
    setQueryId: setQuery,
  };
};

export default useGetLendingsSearchId;
