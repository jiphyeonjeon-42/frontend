import { useEffect, useState } from "react";
import { Tag } from "../../type";
import { useApi } from "../../hook/useApi";
import { AxiosError, AxiosResponse } from "axios";
import { setErrorDialog } from "../../constant/error";

type Props = {
  tagId: number;
};

export const useGetTagsSuperTagIdSub = ({ tagId }: Props) => {
  const [subTagList, setSubTagList] = useState<Tag[]>([]);
  const [isOpened, setOpened] = useState(false);
  const toggleOpened = () => setOpened(!isOpened);

  const { request } = useApi("get", `/tags/${tagId}/sub`);

  const saveTagList = (response: AxiosResponse) => {
    setSubTagList(response.data);
  };

  useEffect(() => {
    if (isOpened) request(saveTagList);
  }, [isOpened]);

  const addSubTag = (subTag: Tag) => {
    setSubTagList(prev => [...prev, subTag]);
  };
  const removeSubTag = (subTagId: number) => {
    setSubTagList(prev => prev.filter(tag => tag.id !== subTagId));
  };
  return { subTagList, toggleOpened, addSubTag, removeSubTag };
};
