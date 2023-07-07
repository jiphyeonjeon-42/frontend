import { useState, useEffect } from "react";
import useApi from "../../hook/useApi";
import { setErrorDialog } from "../../constant/error";

type Props = {
  title: string;
  userId: number;
  bookId: number;
  closeModal: () => void;
  setOpenTitleAndMessage: (title: string, message: string) => void;
};

const usePostLendings = ({
  title,
  userId,
  bookId,
  setOpenTitleAndMessage,
  closeModal,
}: Props) => {
  const [condition, setCondition] = useState("");
  const { request } = useApi("post", "lendings", {
    userId,
    bookId,
    condition,
  });

  const onSuccess = () => {
    setOpenTitleAndMessage("대출결과", `${title} - 대출완료`, closeModal);
  };

  const onError = (error: any) => {
    setErrorDialog(error, setOpenTitleAndMessage, closeModal);
  };

  useEffect(() => {
    if (condition?.length > 0) {
      request(onSuccess, onError);
    }
  }, [condition]);

  return { requestLending: setCondition };
};

export default usePostLendings;
