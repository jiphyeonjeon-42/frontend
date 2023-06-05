import { Tag } from "../../types";
import Draggable from "../utils/Draggable";
import "../../css/SuperTagMergeSubTag.css";

type SuperTagMergeSubTagProp = {
  tag: Tag;
  removePreviousList: (tagId: number) => void;
};

const SuperTagMergeSubTag = ({
  tag,
  removePreviousList,
}: SuperTagMergeSubTagProp) => {
  return (
    <Draggable
      className="super-tag__sub-tag"
      dragData={{ format: "text/plain", data: JSON.stringify(tag) }}
      onDragEnd={() => {
        removePreviousList(tag.id);
      }}
    >
      {tag.content}
    </Draggable>
  );
};

export default SuperTagMergeSubTag;
