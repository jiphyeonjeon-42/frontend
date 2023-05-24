import { Tag } from "../../types";
import { useGetTagsSuperTagIdSub } from "../../api/tags/useGetTagsSuperTagIdSub";
import Accordion from "../utils/Accordion";
import SuperTagMergeSubTag from "./SuperTagMergeSubTag";
import Droppable from "../utils/Droppable";
import Image from "../utils/Image";
import TrashIcon from "../../img/trash.svg";
import { useDeleteTagsSuper } from "../../api/tags/useDeleteTagsSuper";

type Props = {
  tag: Tag;
  removeTag: (tagId: number) => void;
};

const SuperTagMergeAccordion = ({ tag, removeTag }: Props) => {
  const { subTagList, toggleOpened } = useGetTagsSuperTagIdSub({
    tagId: tag.id,
  });
  const { deleteTag } = useDeleteTagsSuper({ removeTag });

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
            onDropped={(data: string) => {
              console.log(data); //TODO: 드래그앤드롭 merge api 호출작업
            }}
          >
            <div className="super-tag__sub-tags">
              {subTagList.map(tag => (
                <SuperTagMergeSubTag tag={tag} key={tag.id} />
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
