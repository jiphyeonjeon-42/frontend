import { useState, useEffect, useMemo } from "react";
import getErrorMessage from "../../constant/error";
import useApiMultiple from "../../hook/useApiMultiple";

const usePostLendingsMultiple = ({
  selectedBooks,
  setSelectedBooks,
  selectedUser,
  setSelectedUser,
  setError,
  closeModal,
}) => {
  const [conditions, setConditions] = useState([]);
  const apiArray = useMemo(
    () =>
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
    [conditions],
  );
  const { requestIndividual } = useApiMultiple(apiArray);

  let resultMessage = "";
  const lendingSuccess = selectedUser.lendings;

  const handleResult = results => {
    results.forEach((result, index) => {
      const title = selectedBooks[index]?.title;
      if (result.status === "fulfilled") {
        const { dueDate } = result.value.data;
        const newLending = {
          title,
          duedate: dueDate,
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
    setSelectedUser({ ...selectedUser, lendingSuccess });
    setError("대출결과", resultMessage);
    closeModal();
  };

  const requestLending = remarks => {
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
