import { useState } from "react";
import { TagType } from "../../../type/TagType";
import Tag from "./Tag";
import TagModal from "./TagModal";
import CreateTagModal from "./CreateTagModal";

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

    event.preventDefault();
    if (isEnterPressed && !createTagModalData && createTag !== "") {
      console.log("enterKey >> ", createTag);
      setCreateTagModalData(true);
    } else if (isEnterPressed && createTagModalData) {
      setTagModalEnter(true);
      console.log("enter in TagModal");
    }
    event.preventDefault();
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
          >
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
