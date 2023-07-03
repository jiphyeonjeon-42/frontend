import { useState, useRef, useEffect } from "react";
import { TagType } from "../../../type/TagType";
import { useLocation } from "react-router-dom";
import { AxiosResponse, AxiosError } from "axios";
import useApi from "../../../hook/useApi";
import Tag from "./Tag";
import TagModal from "./TagModal";
import plusicon from "../../../asset/img/tag_plus.svg";
import Tooltip from "../../utils/Tooltip";

type TagListProps = {
  tagData: TagType[];
  setTagData: React.Dispatch<React.SetStateAction<TagType[]>>;
};

const TagList = ({ tagData, setTagData }: TagListProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const bookId = location.pathname.split("/")[2];
  const [tagModalData, setTagModalData] = useState<number | null>(null);
  const [createTag, setCreateTag] = useState("");
  const [lastPress, setLastPress] = useState(Date.now());
  const [active, setActive] = useState<boolean>(false);
  const [errorCode, setErrorCode] = useState<number | null>(null);
  const [showErrorMassege, setShowErrorMassege] = useState(false);
  const { request } = useApi("post", `/tags/default`, {
    bookInfoId: +bookId,
    content: createTag.trim().replace(/ /g, "_"),
  });

  const onError = (error: AxiosError) => {
    setErrorCode(parseInt(error?.response?.data?.errorCode, 10));
    errorActive();
  };

  const errorActive = () => {
    setActive(true);
    setShowErrorMassege(true);
    setTimeout(() => {
      setActive(false);
    }, 500);
    setTimeout(() => {
      setShowErrorMassege(false);
    }, 2500);
  };

  const postTag = () => {
    request((res: AxiosResponse) => {
      const resTagdata: TagType = res.data;
      setTagData(prev => [...prev, resTagdata]);
      resetCreateContent();
    }, onError);
  };

  const openModalFunc = (tagId: number) => {
    setTagModalData(tagId);
  };

  const closeModal = () => {
    setTagModalData(null);
  };

  const resetCreateContent = () => {
    setCreateTag("");
  };

  const onClickCreateButton = () => {
    handleKeyPress({
      key: "Enter",
      preventDefault: () => {},
    } as React.KeyboardEvent<HTMLInputElement>);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const isEnterPressed = event.key === "Enter";
    event.preventDefault();

    if (isEnterPressed) {
      const now = Date.now();
      if (now - lastPress < 300) return;
      setLastPress(now);
      if (createTag === "") {
        setErrorCode(1);
      } else if (createTag.length > 42) {
        setErrorCode(2);
      }
      if (errorCode !== null && typeof errorCode === "number") {
        errorActive();
      } else {
        postTag();
      }
      if (inputRef.current !== null) {
        inputRef.current.blur();
      }
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorCode(null);
    setCreateTag(event.target.value);
  };

  const getErrorMessage = () => {
    switch (errorCode) {
      case 1:
        return "태그를 입력해주세요.";
      case 2:
        return "42자 이내로 입력해주세요.";
      case 102:
        return "생성 권한이 없습니다.";
      case 900:
        return "사용 불가능한 문자가 있습니다.";
      case 909:
        return "중복된 태그가 있습니다.";
      default:
        return "알 수 없는 에러가 발생했습니다.";
    }
  };

  return (
    <>
      <div className="button_tag-background">
        {tagData.map(item => (
          <Tag
            key={item.id}
            {...item}
            openModalFunc={openModalFunc}
            tagData={tagData}
            setTagData={setTagData}
          ></Tag>
        ))}
        {tagModalData !== null ? (
          <div className="button_tag_modal_background_" onClick={closeModal}>
            <TagModal id={tagModalData} content={""} />
          </div>
        ) : null}
      </div>
      <div className="button_tag-background-create">
        <button
          className={`${
            active ? "button_atcive" : ""
          } button_tag-box button_tag-create-box`}
        >
          <div
            className="tooltip-content button_post_error_message"
            style={{ display: showErrorMassege ? "block" : "none" }}
          >
            {errorCode ? getErrorMessage() : ""}
          </div>
          <input
            title={errorCode ? getErrorMessage() : ""}
            className={`${
              errorCode ? "button_post_error_code" : ""
            } button_tag-box button_tag-create-box button_create-input`}
            ref={inputRef}
            type="textarea"
            value={createTag}
            placeholder={
              tagData.length === 0
                ? "첫 번째 태그를 작성해보세요!"
                : "태그를 입력하세요."
            }
            onChange={onChange}
            onKeyUp={handleKeyPress}
          />

          <Tooltip description="태그 등록">
            <img
              className="button_tag-image-button"
              src={plusicon}
              alt="plus"
              onClick={() => {
                onClickCreateButton();
              }}
            />
          </Tooltip>
        </button>
      </div>
    </>
  );
};

export default TagList;
