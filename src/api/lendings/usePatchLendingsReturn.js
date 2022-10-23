import { useState } from "react";
import useApi from "../../hook/useApi";

const usePatchLendingsReturn = ({ lendingId, title, closeModal, setError }) => {
  const [condition, setCondition] = useState("");

  const { request } = useApi("patch", "lendings/return", {
    lendingId,
    condition,
  });

  const onSuccess = response => {
    closeModal();
    setError(
      `${
        response.data?.reservedBook
          ? "예약된 책입니다. 예약자를 위해 따로 보관해주세요."
          : "반납되었습니다."
      }`,
      title,
    );
  };

  const requestReturn = () => {
    request(onSuccess);
  };

  return {
    condition,
    setCondition,
    requestReturn,
  };
};

export default usePatchLendingsReturn;
