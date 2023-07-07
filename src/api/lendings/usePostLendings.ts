import { useState, useEffect } from "react";
import { useApi } from "../../hook/useApi";
import { useNewDialog } from "../../hook/useNewDialog";

type Props = {
  title: string;
  userId: number;
  bookId: number;
  closeModal: () => void;
};

export const usePostLendings = ({
  title,
  userId,
  bookId,
  closeModal,
}: Props) => {
  const [condition, setCondition] = useState("");
  const { request } = useApi("post", "lendings", {
    userId,
    bookId,
    condition,
  });

  const { addDialogWithTitleAndMessage, addErrorDialog } = useNewDialog();

  const onSuccess = () => {
    const message = `${title} - 대출완료`;
    addDialogWithTitleAndMessage(message, "대출결과", message, closeModal);
  };

  const onError = (error: any) => {
    addErrorDialog(error, closeModal);
  };

  useEffect(() => {
    if (condition?.length > 0) {
      request(onSuccess, onError);
    }
  }, [condition]);

  return { requestLending: setCondition };
};
