import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { TagType } from "../../../type/TagType";
import { useGetTagsBookInfoId } from "../../../api/tags/useGetTagsBookInfoId";
import TagList from "./TagList";
import Button from "../../utils/Button";
import useApi from "../../../hook/useApi";

const TagWrapper = ({ bookInfoId }: TagType) => {
  const [tagData, setTagData] = useState<TagType[]>([]);
  const { request, Dialog } = useApi("get", `/tags/${bookInfoId}`);

  useEffect(() => {
    const getTagRequest = (res: AxiosResponse) => {
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
