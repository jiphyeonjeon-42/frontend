import { TagType } from "../../../type/TagType";
import Tag from "./Tag";
import useApi from "../../../hook/useApi";

type RemoveTagModalProps = {
  id: number;
  content: string;
  tagData: TagType[];
  setTagData: React.Dispatch<React.SetStateAction<TagType[]>>;
};

const RemoveTagModal = ({
  id,
  content,
  tagData,
  setTagData,
}: RemoveTagModalProps) => {
  const { request, Dialog } = useApi("delete", `/tags/sub/${id}`);

  const removeButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    removeTag();
  };

  const removeTag = () => {
    request((res: any) => {
      const updatedTagData = tagData.filter(tag => tag.id !== id);
      setTagData(updatedTagData);
    });
  };

  return (
    <div>
      <Dialog />
      <ul>
        <button className="button_tag-box-sub">{content}</button>
      </ul>
      <button>취소</button>
      <button onClick={removeButton}>삭제</button>
    </div>
  );
};

export default RemoveTagModal;
