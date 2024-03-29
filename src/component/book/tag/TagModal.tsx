import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TagType } from "../../../type/TagType";
import Tooltip from "../../utils/Tooltip";
import TagList from "./TagList";
import Tag from "./Tag";

import { useApi } from "../../../hook/useApi";

const TagModal = ({ id }: TagType) => {
  const [subTagData, setSubTagData] = useState([]);
  const { request } = useApi("get", `/tags/${id}/sub`);

  useEffect(() => {
    const getSubTagRequest = (res: any) => {
      setSubTagData(res.data);
    };
    request(getSubTagRequest);
  }, []);

  return (
    <div className="button_tag-modal-background">
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
