import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import useApi from "../../hook/useApi";
import { setErrorDialog } from "../../data/error";

type PatchTagsSubParamType = {
  id: number;
  visibility: "public" | "private";
};

export const usePatchTagsSub = ({
  setOpenTitleAndMessage,
}: {
  setOpenTitleAndMessage: (
    title: string,
    message: string,
    afterClose?: () => void,
  ) => void;
}) => {
  const [params, setParams] = useState<PatchTagsSubParamType | null>(null);
  const { request } = useApi("patch", "tags/sub", params);

  const displaySuccess = () => {
    setOpenTitleAndMessage("처리되었습니다", "", () =>
      window.location.reload(),
    );
  };
  const displayError = (error: AxiosError) => {
    setErrorDialog(error, setOpenTitleAndMessage);
  };

  useEffect(() => {
    if (params) {
      request(displaySuccess, displayError);
    }
  }, [params]);
  return { setParams };
};
