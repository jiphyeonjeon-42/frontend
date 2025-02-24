import { useState, MouseEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";
import { TagType } from "~/type/TagType";
import { useAtomValue } from "jotai";
import Tooltip from "~/component/utils/Tooltip";
import { userAtom } from "~/atom/userAtom";
import { useApi } from "~/hook/useApi";

import minusicon from "~/asset/img/tag_minus_white.svg";
import trashicon from "~/asset/img/trash_white.svg";
import "~/asset/css/Tags.css";

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
  const { userName } = useAtomValue(userAtom);
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
    else if (login === userName) return "my-sub";
    return "sub";
  };

  const isMysub = login === userName;

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
