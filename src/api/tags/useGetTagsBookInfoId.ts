import { useEffect, useState } from "react";
import { Tag } from "../../type";
import { useApi } from "../../hook/useApi";

export const useGetTagsBookInfoId = (id?: number) => {
  const [tagList, setTagList] = useState<Tag[]>([]);
  const { request, Dialog } = useApi("get", `/tags/${id}`);

  const refineResponse = (response: any) => {
    setTagList(response.data);
  };

  useEffect(() => {
    if (id) {
      request(refineResponse);
    }
  }, [id]);

  const addTag = (tag: Tag) => {
    setTagList(prev => [tag, ...prev]);
  };

  const removeTag = (tagId: number) => {
    setTagList(prev => prev.filter(tag => tag.id !== tagId));
  };

  return { tagList, addTag, removeTag, Dialog };
};
