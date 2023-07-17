import { useState } from "react";
import axiosPromise from "../../util/axios";
import { useNewDialog } from "../../hook/useNewDialog";

type Props = {
  reviewsId: number;
  initialContent: string;
  finishEditMode: () => void;
};

export const usePutReviewsReviewsId = ({
  reviewsId,
  initialContent,
  finishEditMode,
}: Props) => {
  const [content, setContent] = useState(initialContent);

  const { addErrorDialog } = useNewDialog();
  
  const request = () => {
    axiosPromise("put", `/reviews/${reviewsId}`, { content })
      .then(finishEditMode)
      .catch(addErrorDialog);
  };

  return {
    content,
    setContent,
    request,
  };
};
