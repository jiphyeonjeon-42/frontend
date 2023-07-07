import { useEffect, useState } from "react";
import { useApi } from "../../hook/useApi";
import { Book } from "../../type";
import { useNewDialog } from "../../hook/useNewDialog";

type Props = {
  bookTitle: string;
  closeModal: () => void;
};

export const usePatchBooksUpdate = ({ bookTitle, closeModal }: Props) => {
  const [change, setChange] = useState<Partial<Book>>();

  const { request } = useApi("patch", "books/update", change);

  const { addDialogWithTitleAndMessage } = useNewDialog();

  const onSuccess = () => {
    addDialogWithTitleAndMessage(
      `${bookTitle}수정`,
      "수정되었습니다",
      bookTitle,
      () => {
        closeModal();
        window.location.reload();
      },
    );
  };

  useEffect(() => {
    if (change) request(onSuccess);
  }, [change]);

  return { setChange };
};
