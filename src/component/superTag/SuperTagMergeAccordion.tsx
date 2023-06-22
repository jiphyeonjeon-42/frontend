import { DragEventHandler, MouseEventHandler } from "react";
import { useGetTagsSuperTagIdSub } from "../../api/tags/useGetTagsSuperTagIdSub";
import { useDeleteTagsSuper } from "../../api/tags/useDeleteTagsSuper";
import { usePatchTagsBookInfoIdMerge } from "../../api/tags/usePatchTagsBookInfoIdMerge";
import { useNewDialog } from "../../hook/useNewDialog";
import { Tag } from "../../type";
import Accordion from "../utils/Accordion";
import SuperTagMergeSubTag from "./SuperTagMergeSubTag";
import Droppable from "../utils/Droppable";
import Image from "../utils/Image";
import TrashIcon from "../../asset/img/trash.svg";

type Props = {
  bookInfoId: number;
  tag: Tag;
  removeTag: (tagId: number) => void;
};

const SuperTagMergeAccordion = ({ bookInfoId, tag, removeTag }: Props) => {
  const { subTagList, toggleOpened, addSubTag, removeSubTag } =
    useGetTagsSuperTagIdSub({
      tagId: tag.id,
    });
  const { deleteTag } = useDeleteTagsSuper({
    removeTag,
  });

  const { setParams } = usePatchTagsBookInfoIdMerge({
    bookInfoId,
  });

  const addNewListAndMergeIfMoved: DragEventHandler = e => {
    const stringifiedTag = e.dataTransfer.getData("text/plain");
    const { superTag: previousSuperTag, subTag } = JSON.parse(stringifiedTag);
    addSubTag(subTag);
    if (previousSuperTag?.id !== tag.id) {
      setParams({ superTag: tag, subTag });
    }
  };

  const { addConfirmDialog } = useNewDialog();
  const getConfirmThenRemove: MouseEventHandler = e => {
    e.preventDefault();
    e.stopPropagation();
    addConfirmDialog(
      "confirmRemoveTag",
      `태그를 삭제하겠습니까?`,
      `태그 내용 : ${tag.content}`,
      () => {
        deleteTag(tag.id);
      },
    );
  };
  return (
    <div className="super-tag__accordion__wrapper">
      <Accordion
        summaryButtonClassName="super-tag__accordion__summary"
        summaryUI={
          <>
            <span className="super-tag__accordion__super-text">
              {tag.content}
            </span>
            <button
              className="super-tag__accordion__delete"
              onClick={getConfirmThenRemove}
            >
              <Image src={TrashIcon} alt={`delete ${tag.content}`} />
            </button>
          </>
        }
        detailUI={
          <Droppable
            className="super-tag__accordion__detail"
            onDrop={addNewListAndMergeIfMoved}
          >
            <div className="super-tag__sub-tags">
              {subTagList.map(subTag => (
                <SuperTagMergeSubTag
                  superTag={tag}
                  subTag={subTag}
                  key={subTag.id}
                  removePreviousList={removeSubTag}
                />
              ))}
            </div>
          </Droppable>
        }
        onChange={toggleOpened}
      />
    </div>
  );
};

export default SuperTagMergeAccordion;
