import { useEffect, useState } from "react";
import useApi from "../../hook/useApi";
import useDialog from "../../hook/useDialog";
import { AxiosError } from "axios";
import getErrorMessage from "../../data/error";

type Props = {
  removeTag: (tagId: number) => void;
};

export const useDeleteTagsSuper = ({ removeTag }: Props) => {
  const [tagId, setTagId] = useState<number | undefined>(undefined);
  const { Dialog, setOpenTitleAndMessage } = useDialog();

  const { request } = useApi("delete", `/tags/super/${tagId}`);

  const onSuccess = () => {
    setOpenTitleAndMessage("처리되었습니다", "", () => {
      if (tagId) removeTag(tagId);
    });
  };

  const onError = (error: AxiosError) => {
    const errorCode = parseInt(error?.response?.data?.errorCode, 10);
    const [title, message] = getErrorMessage(errorCode).split("\r\n");
    setOpenTitleAndMessage(
      title,
      errorCode ? message : `${message}\r\n${error?.message}`,
    );
  };

  useEffect(() => {
    if (tagId !== undefined) {
      request(onSuccess, onError);
    }
  }, [tagId]);

  return {
    deleteTag: (id: number) => setTagId(id),
    Dialog,
  };
};
