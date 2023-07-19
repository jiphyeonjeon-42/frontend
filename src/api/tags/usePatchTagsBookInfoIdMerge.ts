import { useEffect, useState } from "react";
import { useApi } from "../../hook/useApi";
import { Tag } from "../../type";

type Props = {
  bookInfoId: number;
};

export const usePatchTagsBookInfoIdMerge = ({ bookInfoId }: Props) => {
  const [params, setParams] = useState<{
    subTag: Tag;
    superTag: Tag | null;
  } | null>(null);

  const { request } = useApi("patch", `tags/${bookInfoId}/merge`, {
    subTagIds: [params?.subTag.id],
    superTagId: params?.superTag?.id || null,
  });

  useEffect(() => {
    if (params) request(() => {});
  }, [params]);

  return { setParams };
};
