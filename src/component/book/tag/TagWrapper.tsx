import { useEffect, useState } from "react";
import TagList from "./TagList";
import Button from "../../utils/Button";
import useApi from "../../../hook/useApi";

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

  useEffect(() => {
    const getTagRequest = (res: any) => {
      setTagData(res.data);
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
