import { useState } from "react";
import { useApi } from "../../hook/useApi";
import { useNewDialog } from "../../hook/useNewDialog";

type Props = {
  lendingId: number;
  title: string;
  closeModal: () => void;
};

export const usePatchLendingsReturn = ({
  lendingId,
  title: bookTitle,
  closeModal,
}: Props) => {
  const [condition, setCondition] = useState("");

  const { request } = useApi("patch", "lendings/return", {
    lendingId,
    condition,
  });

  const { addDialogWithTitleAndMessage } = useNewDialog();

  const onSuccess = (response: any) => {
    closeModal();
    const title = response.data?.reservedBook
      ? "예약된 책입니다. 예약자를 위해 따로 보관해주세요."
      : "반납되었습니다.";
    addDialogWithTitleAndMessage(title, title, bookTitle, () =>
      window.location.reload(),
    );
  };

  const requestReturn = () => {
    request(onSuccess);
  };
  return { condition, setCondition, requestReturn };
};
