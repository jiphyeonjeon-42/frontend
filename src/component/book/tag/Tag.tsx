import { MouseEventHandler } from "react";
import { useState } from "react";
import { TagType } from "../../../type/TagType";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Tooltip from "../../utils/Tooltip";
import userState from "../../../atom/userState";
import "../../../asset/css/Tags.css";
import minusicon from "../../../asset/img/tag_minus.svg";
import RemoveTagModal from "./RemoveTagModal";

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
  const [removeTagModalData, setRemoveTagModalData] = useState<boolean | null>(
    null,
  );

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

  const closeRemoveModal = () => {
    setRemoveTagModalData(null);
  };

  const openRemoveModal: MouseEventHandler<HTMLImageElement> = e => {
    e.stopPropagation();
    setRemoveTagModalData(true);
  };

  return (
    <>
      {removeTagModalData !== null ? (
        <div className="button_tag-modal" onClick={closeRemoveModal}>
          <RemoveTagModal
            id={id}
            content={content}
            tagData={tagData}
            setTagData={setTagData}
          />
        </div>
      ) : null}
      <button className={`button_tag-box-${isType()}`} onClick={tagClick}>
        {isMysub ? (
          <img
            className="button_tag-remove-button"
            src={minusicon}
            alt="minus"
            onClick={openRemoveModal}
          />
        ) : null}
        <Tooltip className="button_tag-tooltip" description={login}>
          {content}
        </Tooltip>
      </button>
    </>
  );
};

export default Tag;
