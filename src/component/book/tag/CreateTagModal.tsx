import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { TagType } from "../../../type/TagType";
import Tag from "./Tag";
import useApi from "../../../hook/useApi";
import { AxiosResponse } from "axios";
import Plus from "../../../img/plus_icon_off.svg";
import Image from "../../utils/Image";
import TagList from "./TagList";

type CreateTagModalProps = {
  content: string;
  contentReset(): void;
  tagModalEnter: boolean;
  setTagModalEnter: React.Dispatch<React.SetStateAction<boolean>>;
  setCreateTagModalData: React.Dispatch<React.SetStateAction<boolean | null>>;
};

const CreateTagModal = ({
  content,
  contentReset,
  tagModalEnter,
  setTagModalEnter,
  setCreateTagModalData,
}: CreateTagModalProps) => {
  const location = useLocation();
  const bookId = location.pathname.split("/")[2];
  console.log("loaction🚀", location, bookId);

  const { request, Dialog } = useApi("post", `/tags/default`, {
    bookInfoId: +bookId,
    content,
  });

  const postTag = () => {
    request((res: AxiosResponse) => {
      console.log("태그 생성 >> ", res);
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

  console.log("🚀", content);

  return (
    <div>
      <Dialog />
      <ul>
        <button className="button_tag-box-sub">{content}</button>
      </ul>
      <button>취소</button>
      <button onClick={postTag}>
        {/* <Image src={Plus} alt="등록" /> */}
        등록
      </button>
    </div>
  );
};

export default CreateTagModal;
