import { useEffect } from "react";
import { useApi } from "../../hook/useApi";
import { useSearch } from "../../hook/useSearch";
import { useNewDialog } from "../../hook/useNewDialog";

type Props = {
  setLendingId: (id: number) => void;
  openModal: () => void;
};

export const useGetLendingsSearchId = ({ setLendingId, openModal }: Props) => {
  const { searchParams, setQuery } = useSearch();
  const { request } = useApi("get", "lendings/search", {
    query: searchParams.query,
    type: "bookId",
  });

  const { addDialogWithTitleAndMessage } = useNewDialog();
  const refineResponse = (response: any) => {
    const result = response.data?.items;
    if (result && result?.length > 0 && result[0]?.id !== undefined) {
      setLendingId(result[0].id);
      openModal();
    } else {
      const title = "책을 다시 한번 확인해주세요.";
      addDialogWithTitleAndMessage(
        title,
        title,
        "해당책의 대출기록이 없습니다.",
      );
    }
  };

  useEffect(() => {
    if (searchParams.query) request(refineResponse);
  }, [searchParams]);
  return {
    setQueryId: setQuery,
  };
};
