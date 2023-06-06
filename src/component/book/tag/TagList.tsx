import { useState } from "react";
import Tag from "./Tag";
import TagModal from "./TagModal";
import CreateTagModal from "./CreateTagModal";
import Modal from "../../utils/Modal";
import useModal from "../../../hook/useModal";
import Tooltip from "../../utils/Tooltip";

type TagListProps = {
  tagData: {
    id: number;
    content: string;
    count: number;
    login: string;
  }[];
};

const TagList = ({ tagData }: TagListProps) => {
  const [tagModalData, setTagModalData] = useState<number | null>(null);
  const [createTag, setCreateTag] = useState("");
  const [createTagModalData, setCreateTagModalData] = useState<boolean | null>(
    null,
  );
  const [tagModalEnter, setTagModalEnter] = useState<boolean>(false);

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
    console.log("등록");
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const isEnterPressed = event.key === "Enter";

    if (isEnterPressed && !createTagModalData) {
      console.log("enterKey >> ", createTag);
      event.preventDefault();
      setCreateTagModalData(true);
    } else if (isEnterPressed && createTagModalData) {
      event.preventDefault();
      setTagModalEnter(true);
      console.log("enter in TagModal");
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
          <Tag key={item.id} {...item} openModalFunc={openModalFunc}>
            {/*{console.log(item)}*/}
          </Tag>
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
          <button
            className="button_tag-create-button"
            onClick={() => {
              setCreateTagModalData(true);
            }}
          />
        </button>
      </div>
    </>
  );
};

export default TagList;
