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
    console.log(res);
    addTag({
      id: 441,
      content: newTagName,
      count: 3,
      login: "test",
      type: "super",
    }); //TODO: 새로 생성한 id를 받아와야 함
  };

  return {
    postSuperTag: () => request(onSuccess),
    newTagName,
    setNewTagName,
    Dialog,
  };
};
