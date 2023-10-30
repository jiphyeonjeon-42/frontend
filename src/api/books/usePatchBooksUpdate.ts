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

  const { request } = useApi("patch", "books/donator", {
    ...change,
    categoryId: change?.categoryId ? change.categoryId + 1 : undefined, // DB에는 1부터 저장되어 있으므로 +1
  });

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
