import { useEffect, useState } from "react";
import getErrorMessage from "../../data/error";
import useApi from "../../hook/useApi";

const usePatchBooksUpdate = ({ bookTitle, closeModal }) => {
  const [change, setChange] = useState({});
  const { request, setError, Dialog } = useApi("patch", "books/update", change);

  const onSuccess = () => {
    setError("수정되었습니다", bookTitle, () => {
      closeModal();
      window.location.reload();
    });
  };

  const onError = error => {
    const errorCode = parseInt(error?.response?.data?.errorCode, 10);
    const [title, message] = getErrorMessage(errorCode).split("\r\n");
    setError(title, errorCode ? message : `${message}\r\n${error?.message}`);
  };

  useEffect(() => {
    if (Object.keys(change).length) request(onSuccess, onError);
  }, [change]);

  return { setChange, Dialog };
};

export default usePatchBooksUpdate;
