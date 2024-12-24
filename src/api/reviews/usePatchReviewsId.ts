import { useEffect, useState } from "react";
import { useApi } from "../../hook/useApi";
import { useNewDialog } from "../../hook/useNewDialog";

export const usePatchReviewsId = () => {
  const [reviewId, setReviewId] = useState<number>();
  const { request } = useApi("patch", `reviews/${reviewId}`);

  const { addDialogWithTitleAndMessage } = useNewDialog();
  const onSuccess = () => {
    addDialogWithTitleAndMessage("key-review-update", "처리되었습니다", "", () =>
      window.location.reload(),
    );
  };

  useEffect(() => {
    if (reviewId !== undefined) {
      request(onSuccess);
    }
  }, [reviewId]);
  return { setReviewId };
};
