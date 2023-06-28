import { useEffect, useState } from "react";
import useApi from "../../hook/useApi";
import { setErrorDialog } from "../../constant/error";
import { AxiosError } from "axios";
import { Tag } from "../../types";

type Props = {
  bookInfoId: number;
  setOpenTitleAndMessage: (
    title: string,
    message: string,
    afterClose?: () => void,
  ) => void;
};

export const usePatchTagsBookInfoIdMerge = ({
  bookInfoId,
  setOpenTitleAndMessage,
}: Props) => {
  const [params, setParams] = useState<{
    subTag: Tag;
    superTag: Tag | null;
  } | null>(null);

  const { request } = useApi("patch", `tags/${bookInfoId}/merge`, {
    subTagIds: [params?.subTag.id],
    superTagId: params?.superTag?.id || null,
  });

  const displayError = (error: AxiosError) => {
    setErrorDialog(error, setOpenTitleAndMessage);
  };

  useEffect(() => {
    if (params) request(() => {}, displayError);
  }, [params]);

  return { setParams };
};
