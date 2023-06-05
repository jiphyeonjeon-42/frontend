import { Tag } from "../../types";
import { useGetTagsSuperTagIdSub } from "../../api/tags/useGetTagsSuperTagIdSub";
import Accordion from "../utils/Accordion";
import SuperTagMergeSubTag from "./SuperTagMergeSubTag";
import Droppable from "../utils/Droppable";
import Image from "../utils/Image";
import TrashIcon from "../../img/trash.svg";
import { useDeleteTagsSuper } from "../../api/tags/useDeleteTagsSuper";
import { usePatchTagsBookInfoIdMerge } from "../../api/tags/usePatchTagsBookInfoIdMerge";
import useDialog from "../../hook/useDialog";

type Props = {
  bookInfoId: number;
  tag: Tag;
  removeTag: (tagId: number) => void;
};

const SuperTagMergeAccordion = ({ bookInfoId, tag, removeTag }: Props) => {
  const { Dialog, setOpenTitleAndMessage } = useDialog();
  const { subTagList, toggleOpened, addSubTag, removeSubTag } =
    useGetTagsSuperTagIdSub({
      tagId: tag.id,
      setOpenTitleAndMessage,
    });
  const { deleteTag } = useDeleteTagsSuper({
    removeTag,
    setOpenTitleAndMessage,
  });

  const { setParams } = usePatchTagsBookInfoIdMerge({
    bookInfoId,
    setOpenTitleAndMessage,
    addSubTag,
  });

  const mergeSubTagsIntoSuperTag = (stringifiedTag: string) => {
    const subTag = JSON.parse(stringifiedTag);
    setParams({ superTag: tag, subTag: subTag });
  };

  return (
    <div className="super-tag__accordion__wrapper">
      <Dialog />
      <Accordion
        summaryButtonClassName="super-tag__accordion__summary"
        summaryUI={
          <>
            <span className="super-tag__accordion__super-text">
              {tag.content}
            </span>
            <button
              className="super-tag__accordion__delete"
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                deleteTag(tag.id);
              }}
            >
              <Image src={TrashIcon} alt={`delete ${tag.content}`} />
            </button>
          </>
        }
        detailUI={
          <Droppable
            className="super-tag__accordion__detail"
            onDropped={mergeSubTagsIntoSuperTag}
          >
            <div className="super-tag__sub-tags">
              {subTagList.map(subTag => (
                <SuperTagMergeSubTag
                  tag={subTag}
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
