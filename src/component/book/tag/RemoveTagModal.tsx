import { TagType } from "../../../type/TagType";
import Tag from "./Tag";
import useApi from "../../../hook/useApi";
import { AxiosResponse } from "axios";

type RemoveTagModalProps = {
  id: number;
  content: string;
};

const RemoveTagModal = ({ id, content }: RemoveTagModalProps) => {
  const { request, Dialog } = useApi("delete", `/tags/sub/${id}`);

  const remove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log("remove");
    removeTag();
  };

  const removeTag = () => {
    request((res: AxiosResponse) => {
      console.log("태그 삭제 >> ", res);
    });
  };

  console.log("🚀", content);

  return (
    <div>
      <Dialog />
      <ul>
        <button className="button_tag-box-sub">{content}</button>
      </ul>
      <button>취소</button>
      <button onClick={removeTag}>삭제</button>
    </div>
  );
};

export default RemoveTagModal;
