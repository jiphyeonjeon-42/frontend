import { useState } from "react";
import { useApi } from "../../hook/useApi";
import { AxiosError, AxiosResponse } from "axios";
import { Tag } from "../../type";
import { setErrorDialog } from "../../constant/error";

type Props = {
  bookInfoId: number;
  addTag: (tag: Tag) => void;
  setOpenTitleAndMessage: (
    title: string,
    message: string,
    afterClose?: () => void,
  ) => void;
};

export const usePostTagsSuper = ({
  bookInfoId,
  addTag,
  setOpenTitleAndMessage,
}: Props) => {
  const [newTagName, setNewTagName] = useState("");

  const { request } = useApi("post", "/tags/super", {
    bookInfoId,
    content: newTagName.replace(/ /g, "_"),
  });

  const onSuccess = (res: AxiosResponse<Tag>) => {
    const newTag = res.data;
    addTag(newTag);
    setOpenTitleAndMessage("태그가 추가되었습니다.", newTag.content);
  };

  const displayError = (error: AxiosError) => {
    setErrorDialog(error, setOpenTitleAndMessage);
  };

  return {
    postSuperTag: () => request(onSuccess, displayError),
    newTagName,
    setNewTagName,
  };
};
