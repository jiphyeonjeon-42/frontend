import { useState, useEffect, useMemo } from "react";
import getErrorMessage from "../../constant/error";
import { useApiMultiple } from "../../hook/useApiMultiple";
import { Book, User } from "../../type";
import { useNewDialog } from "../../hook/useNewDialog";

type Props = {
  selectedBooks: Book[];
  setSelectedBooks: React.Dispatch<React.SetStateAction<Book[]>>;
  selectedUser: User;
  setSelectedUser: (user: User) => void;
  closeModal: () => void;
};

export const usePostLendingsMultiple = ({
  selectedBooks,
  setSelectedBooks,
  selectedUser,
  setSelectedUser,
  closeModal,
}: Props) => {
  const [conditions, setConditions] = useState<string[]>([]);
  const { requestIndividual } = useApiMultiple(
    selectedBooks.map((book, index) => {
      return {
        method: "post",
        url: "lendings",
        data: {
          userId: selectedUser.id,
          bookId: book.bookId,
          condition: conditions[index],
        },
      };
    }),
  );

  let resultMessage = "";
  const lendingSuccess = selectedUser.lendings;

  const { addDialogWithTitleAndMessage } = useNewDialog();

  const handleResult = (results: PromiseSettledResult<any>[]) => {
    results.forEach((result, index) => {
      const title = selectedBooks[index]?.title;
      if (result.status === "fulfilled") {
        const { dueDate } = result.value.data;
        const newLending = {
          title,
          dueDate,
        };
        resultMessage += `${selectedBooks[index].title} - 대출완료\n`;
        lendingSuccess.push(newLending);
      } else {
        const errorCode = result.reason?.response?.data?.errorCode;
        resultMessage += `${title} - 대출 실패
(사유 : ${getErrorMessage(errorCode)})\n\n`;
      }
    });
    setSelectedBooks([]);
    setSelectedUser({ ...selectedUser, lendings: lendingSuccess });
    addDialogWithTitleAndMessage(
      `key-lending-${resultMessage}`,
      "대출결과",
      resultMessage,
    );
    closeModal();
  };

  const requestLending = (remarks: string[]) => {
    setConditions([...remarks.filter(remark => remark !== undefined)]);
  };

  useEffect(() => {
    if (conditions.length) {
      requestIndividual(handleResult);
    }
  }, [conditions]);

  return { setConditions, requestLending };
};
