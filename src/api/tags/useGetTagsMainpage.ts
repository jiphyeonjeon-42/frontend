import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { Tag } from "../../type/Tag";
import useApi from "../../hook/useApi";

export const useGetTagsMainpage = () => {
  const [tagData, setTagData] = useState<TagType[]>([]);
  const { request, Dialog } = useApi("get", "tags", {
    limit: 100,
    page: 0,
    visibility: "public",
  });

  useEffect(() => {
    const getMainTagRequest = (response: AxiosResponse) => {
      const tags = response.data.items as Tag[];
      setTagData({ list: tags });
    };
    request(getMainTagRequest);
  }, []);

  return {
    tagData,
  };
};
