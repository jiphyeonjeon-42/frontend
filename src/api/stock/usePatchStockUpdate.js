import { useEffect, useState } from "react";
import getErrorMessage from "../../constant/error";
import { useApi } from "../../hook/useApi";

const usePatchStockUpdate = ({ setOpenTitleAndMessage, addList }) => {
  const [bookId, setBookId] = useState(undefined);
  const { request } = useApi("patch", `stock/update`, { id: bookId });

  const onSuccess = () => {
    setOpenTitleAndMessage("처리되었습니다", "", addList);
  };

  const onError = error => {
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

export default usePatchStockUpdate;
