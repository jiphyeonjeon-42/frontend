import { useEffect, useState } from "react";
import { Tag } from "../../type";
import useApi from "../../hook/useApi";
import { setErrorDialog } from "../../constant/error";

type Props = {
  tagId: number;
  setOpenTitleAndMessage: (
    title: string,
    message: string,
    afterClose?: () => void,
  ) => void;
};

export const useGetTagsSuperTagIdSub = ({
  tagId,
  setOpenTitleAndMessage,
}: Props) => {
  const [subTagList, setSubTagList] = useState<Tag[]>([]);
  const [isOpened, setOpened] = useState(false);
  const toggleOpened = () => setOpened(!isOpened);

  const { request } = useApi("get", `/tags/${tagId}/sub`);

  const saveTagList = (response: any) => {
    setSubTagList(response.data);
  };

  const displayError = (error: any) => {
    setErrorDialog(error, setOpenTitleAndMessage);
  };

  useEffect(() => {
    if (isOpened) request(saveTagList, displayError);
  }, [isOpened]);

  const addSubTag = (subTag: Tag) => {
    setSubTagList(prev => [...prev, subTag]);
  };
  const removeSubTag = (subTagId: number) => {
    setSubTagList(prev => prev.filter(tag => tag.id !== subTagId));
  };
  return { subTagList, toggleOpened, addSubTag, removeSubTag };
};
