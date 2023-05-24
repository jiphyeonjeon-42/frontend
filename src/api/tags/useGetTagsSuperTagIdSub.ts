import { useEffect, useState } from "react";
import { Tag } from "../../types";
import useApi from "../../hook/useApi";
import { AxiosResponse } from "axios";

type Props = {
  tagId: number;
};

export const useGetTagsSuperTagIdSub = ({ tagId }: Props) => {
  const [subTagList, setSubTagList] = useState<Tag[]>([]);
  const [isOpened, setOpened] = useState(false);
  const toggleOpened = () => setOpened(!isOpened);

  const { request, Dialog } = useApi("get", `/tags/${tagId}/sub`);

  const onSuccess = (response: AxiosResponse) => {
    setSubTagList(response.data);
  };
  useEffect(() => {
    if (isOpened) request(onSuccess);
  }, [isOpened]);

  return { subTagList, toggleOpened, Dialog };
};
