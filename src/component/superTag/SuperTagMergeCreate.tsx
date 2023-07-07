import { FormEventHandler } from "react";
import { usePostTagsSuper } from "../../api/tags/usePostTagsSuper";
import { Tag } from "../../type";
import Image from "../utils/Image";
import Arrow from "../../asset/img/arrow_right_black.svg";
import { useDialog } from "../../hook/useDialog";

type Props = {
  bookInfoId: number;
  addTag: (tag: Tag) => void;
};
const SuperTagMergeCreate = ({ bookInfoId, addTag }: Props) => {
  const { Dialog, setOpenTitleAndMessage } = useDialog();
  const { postSuperTag, newTagName, setNewTagName } = usePostTagsSuper({
    bookInfoId,
    addTag,
    setOpenTitleAndMessage,
  });
  const onChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    setNewTagName(e.currentTarget.value);
  };

  const createTag: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    postSuperTag();
    setNewTagName("");
  };

  return (
    <div className="super-tag__accordion__wrapper">
      <form
        className="super-tag__accordion__summary create"
        onSubmit={createTag}
      >
        <Image src={Arrow} />
        <input
          value={newTagName}
          onChange={onChange}
          placeholder="새로운 태그 생성하기"
        />
        <Dialog />
      </form>
    </div>
  );
};

export default SuperTagMergeCreate;
