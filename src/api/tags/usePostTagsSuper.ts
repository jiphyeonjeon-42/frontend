import { useState } from "react";
import { useApi } from "../../hook/useApi";
import { useNewDialog } from "../../hook/useNewDialog";
import { Tag } from "../../type";

type Props = {
  bookInfoId: number;
  addTag: (tag: Tag) => void;
};

export const usePostTagsSuper = ({ bookInfoId, addTag }: Props) => {
  const [newTagName, setNewTagName] = useState("");

  const { request } = useApi("post", "/tags/super", {
    bookInfoId,
    content: newTagName.replace(/ /g, "_"),
  });

  const { addDialogWithTitleAndMessage } = useNewDialog();

  const onSuccess = (res: any) => {
    const newTag = res.data;
    addTag(newTag);
    addDialogWithTitleAndMessage(
      "postTag",
      "태그가 추가되었습니다.",
      newTag.content,
    );
  };

  return {
    postSuperTag: () => request(onSuccess),
    newTagName,
    setNewTagName,
  };
};
