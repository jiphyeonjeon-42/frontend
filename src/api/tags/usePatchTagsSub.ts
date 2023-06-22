import { useEffect, useState } from "react";
import { useApi } from "../../hook/useApi";
import { useNewDialog } from "../../hook/useNewDialog";

type PatchTagsSubParamType = {
  id: number;
  visibility: "public" | "private";
};

export const usePatchTagsSub = () => {
  const [params, setParams] = useState<PatchTagsSubParamType | null>(null);
  const { request } = useApi("patch", "tags/sub", params);

  const { addDialogWithTitleAndMessage } = useNewDialog();
  const displaySuccess = () => {
    addDialogWithTitleAndMessage("result", "처리되었습니다", "", () =>
      window.location.reload(),
    );
  };

  useEffect(() => {
    if (params) {
      request(displaySuccess);
    }
  }, [params]);

  return { setParams };
};
