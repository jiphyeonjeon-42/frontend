import { useState } from "react";
import useApi from "../../hook/useApi";
import { AxiosResponse } from "axios";
import { Tag } from "../../types";

type Props = {
  bookInfoId: number;
  addTag: (tag: Tag) => void;
};

export const usePostTagsSuper = ({ bookInfoId, addTag }: Props) => {
  const [newTagName, setNewTagName] = useState("");

  const { request, Dialog } = useApi("post", "/tags/super", {
    bookInfoId,
    content: newTagName,
  });

  const onSuccess = (res: AxiosResponse) => {
    const newTag = res.data as Tag;
    addTag(newTag);
  };

  return {
    postSuperTag: () => request(onSuccess),
    newTagName,
    setNewTagName,
    Dialog,
  };
};
