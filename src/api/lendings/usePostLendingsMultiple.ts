import { useState, useEffect, useMemo } from "react";
import getErrorMessage from "../../constant/error";
import useApiMultiple from "../../hook/useApiMultiple";
import { Book, User } from "../../type";
import { AxiosResponse } from "axios";

type Props = {
  selectedBooks: Book[];
  setSelectedBooks: React.Dispatch<React.SetStateAction<Book[]>>;
  selectedUser: User;
  setSelectedUser: (user: User) => void;
  setError: (title: string, message: string) => void;
  closeModal: () => void;
};

const usePostLendingsMultiple = ({
  selectedBooks,
  setSelectedBooks,
  selectedUser,
  setSelectedUser,
  setError,
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

  const handleResult = (results: PromiseSettledResult<AxiosResponse>[]) => {
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
    setError("대출결과", resultMessage);
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

export default usePostLendingsMultiple;
