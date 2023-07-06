import { useEffect, useState } from "react";
import getErrorMessage from "../../constant/error";
import { useApi } from "../../hook/useApi";

type Props = {
  setOpenTitleAndMessage: (
    title: string,
    message: string,
    afterClose?: () => void,
  ) => void;
};

export const usePatchReviewsId = ({ setOpenTitleAndMessage }: Props) => {
  const [reviewId, setReviewId] = useState<number>();
  const { request } = useApi("patch", `reviews/${reviewId}`);

  const onSuccess = () => {
    setOpenTitleAndMessage("처리되었습니다", "", () =>
      window.location.reload(),
    );
  };

  const onError = (error: any) => {
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
