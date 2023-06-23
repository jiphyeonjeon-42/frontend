import { useEffect, useState } from "react";
import { useApi } from "../../hook/useApi";
import { useNewDialog } from "../../hook/useNewDialog";
import { Book } from "../../type";

type Props = {
  bookTitle: string;
  closeModal: () => void;
};

export const usePatchBooksUpdate = ({ bookTitle, closeModal }: Props) => {
  const [change, setChange] = useState<Book>();

  const { request } = useApi("patch", "books/update", change);
  const { addDialogWithTitleAndMessage } = useNewDialog();

  const onSuccess = () => {
    addDialogWithTitleAndMessage("alert", "수정되었습니다", bookTitle, () => {
      closeModal();
      window.location.reload();
    });
  };

  useEffect(() => {
    if (change) request(onSuccess);
  }, [change]);

  return { setChange };
};
