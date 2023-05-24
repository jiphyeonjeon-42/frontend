import { FormEventHandler, useState } from "react";
import { usePostTagsSuper } from "../../api/tags/usePostTagsSuper";
import { Tag } from "../../types";

type Props = {
  bookInfoId: number;
  addTag: (tag: Tag) => void;
};
const SuperTagMergeCreate = ({ bookInfoId, addTag }: Props) => {
  const { postSuperTag, newTagName, setNewTagName, Dialog } = usePostTagsSuper({
    bookInfoId,
    addTag,
  });
  const onChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    setNewTagName(e.currentTarget.value);
  };

  const createTag: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    postSuperTag();
  };

  return (
    <form className="super-tag__accordion__wrapper" onSubmit={createTag}>
      <input
        className="super-tag__accordion__summary"
        value={newTagName}
        onChange={onChange}
        placeholder="새로운 태그 생성하기"
      />
      <Dialog />
    </form>
  );
};

export default SuperTagMergeCreate;
