import { Tag } from "../../types";
import Draggable from "../utils/Draggable";
import "../../asset/css/SuperTagMergeSubTag.css";

type Props = {
  superTag: Tag | null;
  subTag: Tag;
  removePreviousList: (tagId: number) => void;
};

const SuperTagMergeSubTag = ({
  superTag,
  subTag,
  removePreviousList,
}: Props) => {
  return (
    <Draggable
      className="super-tag__sub-tag"
      dragData={{
        format: "text/plain",
        data: JSON.stringify({ superTag, subTag }),
      }}
      onDragLeave={() => {
        removePreviousList(subTag.id);
      }}
    >
      {subTag.content}
    </Draggable>
  );
};

export default SuperTagMergeSubTag;
