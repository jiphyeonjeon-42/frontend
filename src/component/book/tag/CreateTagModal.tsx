import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { TagType } from "../../../type/TagType";
import { useApi } from "../../../hook/useApi";
import { AxiosResponse } from "axios";

type CreateTagModalProps = {
  content: string;
  contentReset(): void;
  tagModalEnter: boolean;
  setTagModalEnter: React.Dispatch<React.SetStateAction<boolean>>;
  setCreateTagModalData: React.Dispatch<React.SetStateAction<boolean | null>>;
  tagData: TagType[];
  setTagData: React.Dispatch<React.SetStateAction<TagType[]>>;
};

const CreateTagModal = ({
  content,
  contentReset,
  tagModalEnter,
  setTagModalEnter,
  setCreateTagModalData,
  setTagData,
}: CreateTagModalProps) => {
  const [createContent, setCreateContent] = useState(content);

  const location = useLocation();
  const bookId = location.pathname.split("/")[2];
  const { request, Dialog } = useApi("post", `/tags/default`, {
    bookInfoId: +bookId,
    createContent,
  });

  const postTag = () => {
    request((res: AxiosResponse) => {
      console.log("태그 생성 >> ", res);
      /* 
      // TODO:
      setTagData(tagData.append())
      res로 들어온 data를 맞춰서 tagtype[]에 append하기.
      */
    });
  };

  useEffect(() => {
    if (tagModalEnter) {
      postTag();
      setTagModalEnter(false);
      setCreateTagModalData(null);
      contentReset();
    }
  }, [tagModalEnter, setTagModalEnter, setCreateTagModalData, postTag]);

  return (
    <div>
      <Dialog />
      <ul>
        <button className="button_tag-box-sub">{createContent}</button>
      </ul>
      <button>취소</button>
      <button onClick={postTag}>등록</button>
    </div>
  );
};

export default CreateTagModal;
