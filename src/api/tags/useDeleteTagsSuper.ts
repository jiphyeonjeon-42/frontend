import { useEffect, useState } from "react";
import { useApi } from "../../hook/useApi";
import { useNewDialog } from "../../hook/useNewDialog";

type Props = {
  removeTag: (tagId: number) => void;
};

export const useDeleteTagsSuper = ({ removeTag }: Props) => {
  const [tagId, setTagId] = useState<number | undefined>(undefined);

  const { request } = useApi("delete", `/tags/super/${tagId}`);

  const { addDialogWithTitleAndMessage } = useNewDialog();
  const onSuccess = () => {
    addDialogWithTitleAndMessage(
      `${tagId}patched`,
      "처리되었습니다",
      "",
      () => {
        tagId && removeTag(tagId);
      },
    );
  };

  useEffect(() => {
    if (tagId !== undefined) {
      request(onSuccess);
    }
  }, [tagId]);

  return {
    deleteTag: (id: number) => setTagId(id),
  };
};
