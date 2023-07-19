import { useGetTagsBookInfoId } from "../../api/tags/useGetTagsBookInfoId";
import { Book } from "../../type";
import SuperTagMergeDefaultTag from "./SuperTagMergeDefaultTag";
import SuperTagMergeAccordion from "./SuperTagMergeAccordion";
import SuperTagMergeCreate from "./SuperTagMergeCreate";
import DragZone from "../utils/DragZone";
import "../../asset/css/SuperTagMerge.css";

type SuperTagMergeProps = {
  book: Book;
};
const SuperTagMerge = ({ book }: SuperTagMergeProps) => {
  const bookInfoId = book.id || book.bookInfoId;
  const { tagList, addTag, removeTag } = useGetTagsBookInfoId(bookInfoId);

  const defaultTagList = tagList.filter(i => i.type === "default");
  const superTagList = tagList.filter(i => i.type === "super");

  return (
    <div className="super-tag__merge__wrapper">
      <SuperTagMergeCreate bookInfoId={bookInfoId} addTag={addTag} />
      <DragZone>
        <SuperTagMergeDefaultTag
          bookInfoId={bookInfoId}
          defaultTagList={defaultTagList}
          addTag={addTag}
          removeTag={removeTag}
        />
        {superTagList.map(tag => (
          <SuperTagMergeAccordion
            bookInfoId={bookInfoId}
            tag={tag}
            key={tag.id}
            removeTag={removeTag}
          />
        ))}
      </DragZone>
    </div>
  );
};

export default SuperTagMerge;
