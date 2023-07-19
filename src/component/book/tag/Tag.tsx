import { MouseEventHandler } from "react";
import { useState } from "react";
import { TagType } from "../../../type/TagType";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Tooltip from "../../utils/Tooltip";
import userState from "../../../atom/userState";
import "../../../asset/css/Tags.css";
import { useApi } from "../../../hook/useApi";
import { AxiosResponse } from "axios";

import minusicon from "../../../asset/img/tag_minus_white.svg";
import trashicon from "../../../asset/img/trash_white.svg";

type TagProps = TagType & {
  tagData: TagType[];
  setTagData: React.Dispatch<React.SetStateAction<TagType[]>>;
  openModalFunc(id: number): void;
};

const Tag = ({
  id,
  content,
  count,
  login,
  type,
  openModalFunc,
  tagData,
  setTagData,
}: TagProps) => {
  const navigate = useNavigate();
  const currentLogin = useRecoilValue(userState);
  const [clickDeleteTag, setClickDeleteTag] = useState(false);
  const [icon, setIcon] = useState(minusicon);
  const { request } = useApi("delete", `/tags/sub/${id}`);

  const removeTag = () => {
    request((res: AxiosResponse) => {
      const updatedTagData = tagData.filter(tag => tag.id !== id);
      setTagData(updatedTagData);
    });
  };

  const tagClick: MouseEventHandler<HTMLButtonElement> = e => {
    e.stopPropagation();
    const encodedURIContent = encodeURIComponent(content);
    if (!count) {
      try {
        navigate(`/search?search=${encodedURIContent}`);
      } catch (e) {
        console.error(e);
      }
    }
    openModalFunc(id);
  };

  const isType = () => {
    if (type === "super") return "super";
    else if (login === currentLogin.userName) return "my-sub";
    return "sub";
  };

  const isMysub = login === currentLogin.userName;

  const onClickImage: MouseEventHandler<HTMLImageElement> = e => {
    e.stopPropagation();
    if (icon === trashicon) {
      removeTag();
    } else {
      setTimeout(() => {
        setIcon(trashicon);
      }, 1000);
      setClickDeleteTag(true);
    }
  };

  return (
    <>
      <button
        className={`button_tag-box button_tag-box-${isType()}`}
        onClick={tagClick}
      >
        <Tooltip description={login ?? "Librarian"}>{content}</Tooltip>
        {isMysub ? (
          <Tooltip description="태그 삭제">
            <img
              className={`${
                clickDeleteTag ? "rotate" : ""
              } button_tag-image-button`}
              src={icon}
              alt="icon"
              onClick={onClickImage}
            />
          </Tooltip>
        ) : null}
      </button>
    </>
  );
};

export default Tag;
