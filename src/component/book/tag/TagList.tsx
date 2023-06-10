import { useState } from "react";
import { TagType } from "../../../type/TagType";
import Tag from "./Tag";
import TagModal from "./TagModal";
import CreateTagModal from "./CreateTagModal";
import plusicon from "../../../img/tag_plus.svg";

type TagListProps = {
  tagData: {
    id: number;
    content: string;
    count: number;
    login: string;
  }[];
  setTagData: React.Dispatch<React.SetStateAction<TagType[]>>;
};

const TagList = ({ tagData, setTagData }: TagListProps) => {
  const [tagModalData, setTagModalData] = useState<number | null>(null);
  const [createTag, setCreateTag] = useState("");
  const [createTagModalData, setCreateTagModalData] = useState<boolean | null>(
    null,
  );
  const [tagModalEnter, setTagModalEnter] = useState<boolean>(false);
  const [lastPress, setLastPress] = useState(Date.now());

  const openModalFunc = (tagId: number) => {
    setTagModalData(tagId);
  };

  const closeModal = () => {
    setTagModalData(null);
  };

  const closeCreateModal = () => {
    setCreateTagModalData(null);
  };

  const resetCreateContent = () => {
    setCreateTag("");
  };

  const openCreateModal = () => {
    if (createTag !== "") setCreateTagModalData(true);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const isEnterPressed = event.key === "Enter";
    event.preventDefault();

    if (isEnterPressed) {
      const now = Date.now();
      if (now - lastPress < 300) return;
      setLastPress(now);

      if (!createTagModalData) {
        openCreateModal();
      } else if (createTagModalData) {
        setTagModalEnter(true);
      }
    }
  };

  return (
    <>
      <div className="button_tag-background">
        {tagModalData !== null ? (
          <div className="button_tag-modal" onClick={closeModal}>
            <TagModal id={tagModalData}></TagModal>
          </div>
        ) : null}
        {createTagModalData !== null ? (
          <div className="button_tag-modal" onClick={closeCreateModal}>
            <CreateTagModal
              content={createTag}
              contentReset={resetCreateContent}
              tagModalEnter={tagModalEnter}
              setTagModalEnter={setTagModalEnter}
              setCreateTagModalData={setCreateTagModalData}
            ></CreateTagModal>
          </div>
        ) : null}
        {tagData.map(item => (
          <Tag
            key={item.id}
            {...item}
            openModalFunc={openModalFunc}
            tagData={tagData}
            setTagData={setTagData}
          ></Tag>
        ))}

        <button className="button_tag-create-box">
          <input
            className="button_tag-create-box"
            required
            type="textarea"
            value={createTag}
            placeholder="태그를 생성하세요."
            onChange={event => setCreateTag(event.target.value)}
            onKeyUp={handleKeyPress}
          />
          <img
            className="button_tag-create-button"
            src={plusicon}
            alt="plus"
            onClick={() => {
              openCreateModal();
            }}
          />
        </button>
      </div>
    </>
  );
};

export default TagList;
