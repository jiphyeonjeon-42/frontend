import { useState } from "react";

import { useNewDialog } from "../../hook/useNewDialog";
import axiosPromise from "../../util/axios";

type Props = {
  bookInfoId: number;
  resetTab: () => void;
};

export const usePostReview = ({ bookInfoId, resetTab }: Props) => {
  const [content, setContent] = useState("");

  const { addErrorDialog } = useNewDialog();

  const request = () =>
    axiosPromise("post", "/reviews", {
      bookInfoId,
      content,
    })
      .then(resetTab)
      .catch(addErrorDialog);
  return { content, setContent, request };
};
