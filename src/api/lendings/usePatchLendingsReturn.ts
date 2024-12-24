import { useState } from "react";
import { useApi } from "../../hook/useApi";
import { useNewDialog } from "../../hook/useNewDialog";

type Props = {
  lendingId: number;
  messageData: { 
    title: string; 
    dueDate: string; 
    penaltyDays: number; // must be >= 0
  };
  closeModal: () => void;
};

export const usePatchLendingsReturn = ({
  lendingId,
  messageData,
  closeModal,
}: Props) => {
  const [condition, setCondition] = useState("");

  const { request } = useApi("patch", "lendings/return", {
    lendingId,
    condition,
  });

  const { title, dueDate } = messageData
  const penaltyDays = Math.max(0, messageData.penaltyDays);
  let message = `${title} 도서는 반납되었습니다.\r\n`
  const today = new Date().toISOString().split("T")[0];
  const diffDays = Math.ceil((new Date(today).getTime() - new Date(dueDate).getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays > 0 && penaltyDays == 0) {
    message += `${diffDays}일 연체되어 ${diffDays}일 동안 대출이 불가합니다.`
  }else if (diffDays > 0 && penaltyDays > 0) {
    message += `${diffDays}일 연체되어, 기존 ${penaltyDays}일 연체 기간과 합쳐 ${penaltyDays + diffDays}일 동안 대출이 불가합니다.`
  } else {
    message += `정상적으로 반납되었습니다.`
  }

  const { addDialogWithTitleAndMessage } = useNewDialog();

  const onSuccess = (response: any) => {
    closeModal();
    const title = response.data?.reservedBook
      ? "예약된 책입니다. 예약자를 위해 따로 보관해주세요."
      : "반납되었습니다.";
    addDialogWithTitleAndMessage(title, title, message, () =>
      window.location.reload(),
    );
  };

  const requestReturn = () => {
    request(onSuccess);
  };
  return { condition, setCondition, requestReturn };
};
