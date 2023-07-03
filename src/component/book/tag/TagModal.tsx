import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TagType } from "../../../type/TagType";
import Tooltip from "../../utils/Tooltip";
import TagList from "./TagList";
import Tag from "./Tag";

import useApi from "../../../hook/useApi";
import { AxiosResponse } from "axios";

const TagModal = ({ id }: TagType) => {
  const [subTagData, setSubTagData] = useState<TagType[]>([]);
  const { request, Dialog } = useApi("get", `/tags/${id}/sub`);

  useEffect(() => {
    const getSubTagRequest = (res: AxiosResponse) => {
      setSubTagData(res.data);
    };
    request(getSubTagRequest);
  }, []);

  return (
    <div className="button_tag_modal_in_background">
      <Dialog />
      {subTagData.map((item: TagType) => (
        <Tag
          key={item.id}
          {...item}
          openModalFunc={() => {}}
          tagData={subTagData}
          setTagData={setSubTagData}
        />
      ))}
    </div>
  );
};

export default TagModal;
