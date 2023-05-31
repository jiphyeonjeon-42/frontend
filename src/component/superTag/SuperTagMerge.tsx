import { useGetTagsBookInfoId } from "../../api/tags/useGetTagsBookInfoId";
import { Book } from "../../types";
import SuperTagMergeDefaultTag from "./SuperTagMergeDefaultTag";
import SuperTagMergeAccordion from "./SuperTagMergeAccordion";
import SuperTagMergeCreate from "./SuperTagMergeCreate";
import DragZone from "../utils/DragZone";
import "../../css/SuperTagMerge.css";

type SuperTagMergeProps = {
  book: Book;
};
const SuperTagMerge = ({ book }: SuperTagMergeProps) => {
  const { tagList, addTag, removeTag, Dialog } = useGetTagsBookInfoId(book.id);

  const defaultTagList = tagList.filter(i => i.type === "default");
  const superTagList = tagList.filter(i => i.type === "super");

  return (
    <div className="super-tag__merge__wrapper">
      <Dialog />
      <DragZone>
        <SuperTagMergeDefaultTag defaultTagList={defaultTagList} />
        {superTagList.map(tag => (
          <SuperTagMergeAccordion
            tag={tag}
            key={tag.id}
            removeTag={removeTag}
          />
        ))}
        <SuperTagMergeCreate
          bookInfoId={book.id || book.bookInfoId}
          addTag={addTag}
        />
      </DragZone>
    </div>
  );
};

export default SuperTagMerge;
