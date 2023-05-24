import { useState } from "react";
import { Tag } from "../../types";
import Accordion from "../utils/Accordion";
import SearchBar from "../utils/SearchBar";
import SuperTagMergeSubTag from "./SuperTagMergeSubTag";
import Droppable from "../utils/Droppable";

type Props = {
  defaultTagList: Tag[];
};
const SuperTagMergeDefaultTag = ({ defaultTagList }: Props) => {
  const [searchInput, setSearchInput] = useState("");
  const defaultTagFiltered = defaultTagList.filter(tag =>
    tag.content.includes(searchInput),
  );

  return (
    <div className="super-tag__accordion__wrapper">
      <Accordion
        summaryButtonClassName="super-tag__accordion__summary"
        summaryUI={<span>분류없음</span>}
        initialOpened={true}
        detailUI={
          <Droppable
            className="super-tag__accordion__detail"
            format="text/plain"
            onDropped={() => {
              console.log("dropped") //TODO: 드래그앤드롭 merge api 호출작업
            }}
          >
            <SearchBar
              wrapperClassName="super-tag__default__search-bar"
              width="short"
              placeHolder="분류없음 내 검색"
              setQuery={setSearchInput}
              isFocusedOnMount={false}
            />
            <div className="super-tag__sub-tags">
              {defaultTagFiltered.map(tag => (
                <SuperTagMergeSubTag tag={tag} key={tag.id} />
              ))}
            </div>
          </Droppable>
        }
      />
    </div>
  );
};

export default SuperTagMergeDefaultTag;
