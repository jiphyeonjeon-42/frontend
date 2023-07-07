import { useEffect, useState } from "react";
import { useApi } from "../../hook/useApi";
import { useNewDialog } from "../../hook/useNewDialog";
import { client } from "../../util/tsRestClient";

export const usePatchReviewsId = () => {
  const { addErrorDialog, addDialogWithTitleAndMessage } = useNewDialog();

  const mutation = client.reviews.patch.useMutation({
    onSuccess: () => {
      console.log("local success");
      addDialogWithTitleAndMessage("patched", "처리되었습니다", "", () =>
        window.location.reload(),
      );
    },
    onError: err => {
      switch (err.status) {
        case 401:
          return addErrorDialog({ response: { data: err.body } });
        case 404:
          return addDialogWithTitleAndMessage(
            err.body.toString(),
            "리뷰 검색 실패",
            "검색한 리뷰가 존재하지 않습니다",
          );
        default:
          return addErrorDialog(err);
      }
    },
  });
  return mutation;
};
