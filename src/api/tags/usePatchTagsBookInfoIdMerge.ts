import { useEffect, useState } from "react";
import useApi from "../../hook/useApi";
import { setErrorDialog } from "../../data/error";
import { AxiosError } from "axios";
import { Tag } from "../../types";

type Props = {
  bookInfoId: number;
  setOpenTitleAndMessage: (
    title: string,
    message: string,
    afterClose?: () => void,
  ) => void;
  addSubTag: (subTag: Tag) => void;
};

export const usePatchTagsBookInfoIdMerge = ({
  bookInfoId,
  setOpenTitleAndMessage,
  addSubTag,
}: Props) => {
  const [params, setParams] = useState<{
    subTag: Tag;
    superTag: Tag | null;
  } | null>(null);

  const { request } = useApi("patch", `tags/${bookInfoId}/merge`, {
    subTagIds: [params?.subTag.id],
    superTagId: params?.superTag?.id || null,
  });

  const displaySuccess = () => {
    setOpenTitleAndMessage("처리되었습니다", "", () => {
      if (params) addSubTag(params?.subTag);
    });
  };

  const displayError = (error: AxiosError) => {
    setErrorDialog(error, setOpenTitleAndMessage);
  };

  useEffect(() => {
    if (params) request(displaySuccess, displayError);
  }, [params]);

  return { setParams };
};
