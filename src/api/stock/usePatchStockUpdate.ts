import { useEffect, useState } from "react";
import getErrorMessage from "../../constant/error";
import { useApi } from "../../hook/useApi";

type Props = {
  setOpenTitleAndMessage: (
    title: string,
    message: string,
    afterClose?: () => void,
  ) => void;
  addList: () => void;
};

export const usePatchStockUpdate = ({
  setOpenTitleAndMessage,
  addList,
}: Props) => {
  const [bookId, setBookId] = useState<number>();
  const { request } = useApi("patch", `stock/update`, { id: bookId });

  const onSuccess = () => {
    setOpenTitleAndMessage("처리되었습니다", "", addList);
  };

  const onError = (error: any) => {
    const errorCode = parseInt(error?.response?.data?.errorCode, 10);
    const [title, message] = getErrorMessage(errorCode).split("\r\n");
    setOpenTitleAndMessage(
      title,
      errorCode ? message : `${message}\r\n${error?.message}`,
    );
  };

  useEffect(() => {
    if (bookId !== undefined) {
      request(onSuccess, onError);
    }
  }, [bookId]);
  return { setBookId };
};
