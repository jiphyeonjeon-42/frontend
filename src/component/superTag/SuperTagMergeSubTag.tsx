import { Tag } from "../../types";
import Draggable from "../utils/Draggable";
import "../../css/SuperTagMergeSubTag.css";

type SuperTagMergeSubTagProp = {
  tag: Tag;
};

const SuperTagMergeSubTag = ({ tag }: SuperTagMergeSubTagProp) => {
  return (
    <Draggable
      className="super-tag__sub-tag"
      dragData={{ format: "text/plain", data: `${tag.id}` }}
    >
      {tag.content}
    </Draggable>
  );
};

export default SuperTagMergeSubTag;
