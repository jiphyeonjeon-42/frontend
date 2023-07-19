import { useState } from "react";

import { useNewDialog } from "../../hook/useNewDialog";
import axiosPromise from "../../util/axios";

type Props = {
  bookInfoId: number;
  resetTab: () => void;
};

export const usePostReview = ({ bookInfoId, resetTab }: Props) => {
  const [content, setContent] = useState("");

  const { addDialogWithTitleAndMessage, addErrorDialog } = useNewDialog();

  const displaySuccessAndResetTab = () => {
    const title = "성공적으로 등록되었습니다";
    addDialogWithTitleAndMessage(title, title, "", resetTab);
  };

  const request = () =>
    axiosPromise("post", "/reviews", {
      bookInfoId,
      content,
    })
      .then(displaySuccessAndResetTab)
      .catch(addErrorDialog);

  return { content, setContent, request };
};
