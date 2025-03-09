import { useEffect, useState } from "react";
import { useApi } from "../../hook/useApi";
import { useNewDialog } from "../../hook/useNewDialog";

type Props = {
  addList: () => void;
};

export const usePatchStockUpdate = ({ addList }: Props) => {
  const [bookId, setBookId] = useState<number>();
  const { request } = useApi("patch", `stock/update`, { id: bookId });

  const { addDialogWithTitleAndMessage } = useNewDialog();
  const onSuccess = () => {
    addDialogWithTitleAndMessage(
      "key-stock-update",
      "처리되었습니다",
      "",
      addList,
    );
  };

  useEffect(() => {
    if (bookId !== undefined) {
      request(onSuccess);
    }
  }, [bookId]);
  return { setBookId };
};
