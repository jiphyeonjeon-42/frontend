import { useEffect, useState } from "react";
import getErrorMessage from "../../constant/error";
import useApi from "../../hook/useApi";

const usePatchReviewsId = ({ setOpenTitleAndMessage }) => {
  const [reviewId, setReviewId] = useState(undefined);
  const { request } = useApi("patch", `reviews/${reviewId}`);

  const onSuccess = () => {
    setOpenTitleAndMessage("처리되었습니다", "", () =>
      window.location.reload(),
    );
  };

  const onError = error => {
    const errorCode = parseInt(error?.response?.data?.errorCode, 10);
    const [title, message] = getErrorMessage(errorCode).split("\r\n");
    setOpenTitleAndMessage(
      title,
      errorCode ? message : `${message}\r\n${error?.message}`,
    );
  };

  useEffect(() => {
    if (reviewId !== undefined) {
      request(onSuccess, onError);
    }
  }, [reviewId]);
  return { setReviewId };
};

export default usePatchReviewsId;
