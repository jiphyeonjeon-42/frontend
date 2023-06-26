import { useState, useEffect } from "react";
import { useApi } from "../../hook/useApi";
import { useNewDialog } from "../../hook/useNewDialog";
import { AxiosError } from "axios";

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

  const { addDialogWithTitleAndMessage, displayErrorDialog } = useNewDialog();

  const onSuccess = () => {
    addDialogWithTitleAndMessage(
      "lendingSuccess",
      "대출결과",
      `${title} - 대출완료`,
      () => {
        closeModal();
        window.location.reload();
      },
    );
  };

  const onError = (error: AxiosError<{ errorCode: number }>) => {
    displayErrorDialog(error, closeModal);
  };

  useEffect(() => {
    if (condition?.length > 0) {
      request(onSuccess, onError);
    }
  }, [condition]);

  return { requestLending: setCondition };
};
