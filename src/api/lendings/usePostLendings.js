import { useState, useEffect } from "react";
import useApi from "../../hook/useApi";
import { setErrorDialog } from "../../data/error";

const usePostLendings = ({
  title,
  userId,
  bookId,
  setOpenTitleAndMessage,
  closeModal,
}) => {
  const [condition, setCondition] = useState(undefined);
  const { request } = useApi("post", "lendings", {
    userId,
    bookId,
    condition,
  });

  const onSuccess = () => {
    setOpenTitleAndMessage("대출결과", `${title} - 대출완료`, closeModal);
  };

  const onError = error => {
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
