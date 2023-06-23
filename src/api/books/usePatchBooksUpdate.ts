import { useEffect, useState } from "react";
import useApi from "../../hook/useApi";
import getErrorMessage from "../../constant/error";
import { Book } from "../../type";

type Props = {
  bookTitle: string;
  closeModal: () => void;
};

const usePatchBooksUpdate = ({ bookTitle, closeModal }: Props) => {
  const [change, setChange] = useState<Book>();

  const { request, setError, Dialog } = useApi("patch", "books/update", change);

  const onSuccess = () => {
    setError("수정되었습니다", bookTitle, () => {
      closeModal();
      window.location.reload();
    });
  };

  const onError = (error: any) => {
    const errorCode = parseInt(error?.response?.data?.errorCode, 10);
    const [title, message] = getErrorMessage(errorCode).split("\r\n");
    setError(title, errorCode ? message : `${message}\r\n${error?.message}`);
  };

  useEffect(() => {
    if (change) request(onSuccess, onError);
  }, [change]);

  return { setChange, Dialog };
};

export default usePatchBooksUpdate;
