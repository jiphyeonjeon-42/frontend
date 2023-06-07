import { useEffect, useState } from "react";
import TagList from "./TagList";
import Button from "../../utils/Button";
import useApi from "../../../hook/useApi";
import { AxiosResponse } from "axios";

type TagProps = {
  bookInfoId: string;
};

type TagData = {
  id: number;
  content: string;
  count: number;
  login: string;
};

const TagWrapper = ({ bookInfoId }: TagProps) => {
  const [tagData, setTagData] = useState<TagData[]>([]);
  const { request, Dialog } = useApi("get", `/tags/${bookInfoId}`);

  console.log("tag wrapper");

  useEffect(() => {
    const getTagRequest = (res: AxiosResponse) => {
      setTagData(res.data);
      console.log("태그 데이터 >> ", res.data);
    };
    request(getTagRequest);
  }, []);

  return (
    <div className="none-drag">
      <Dialog />
      <TagList tagData={tagData} setTagData={setTagData} />
    </div>
  );
};

export default TagWrapper;
