import { MouseEventHandler } from "react";
import { useState } from "react";
import { TagType } from "../../../type/TagType";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Tooltip from "../../utils/Tooltip";
import userState from "../../../atom/userState";
import "../../../css/Tags.css";
import plusicon from "../../../img/tag_plus.svg";
import minusicon from "../../../img/tag_minus.svg";
import useApi from "../../../hook/useApi";
import { AxiosResponse } from "axios";

type TagProps = TagType & {
  openModalFunc(id: number): void;
};

const Tag = ({ id, content, count, login, type, openModalFunc }: TagProps) => {
  const navigate = useNavigate();
  const currentLogin = useRecoilValue(userState);
  const { request, Dialog } = useApi("delete", `/tags/sub/${id}`);
  const [removeTagModalData, setRemoveTagModalData] = useState<boolean | null>(
    null,
  );

  const tagClick: MouseEventHandler<HTMLButtonElement> = e => {
    e.stopPropagation();
    console.log("count: ", count);
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

  const isMysub = count === 0 && login === currentLogin.userName;

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

  return (
    <button className={`button_tag-box-${isType()}`} onClick={tagClick}>
      <Tooltip className="button_tag-tooltip" description={login}>
        {content}
      </Tooltip>
      <Dialog />
      {isMysub ? (
        <img
          className="button_tag-remove-button"
          src={minusicon}
          alt="minus"
          onClick={remove}
        />
      ) : null}
    </button>
  );
};

export default Tag;
