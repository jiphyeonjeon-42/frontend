import { MouseEvent } from "react";
import ManagementListItem from "../utils/ManagementListItem";
import VisibilityToggleButton from "../utils/VisibilityToggleButton";
import { Link } from "react-router-dom";
import Date from "../utils/Date";
import { Tag } from "../../types/Tag";
import Tooltip from "../utils/Tooltip";
import EllipsisedSpan from "../utils/EllipsisedSpan";

type SubTagManagementListProps = {
  tagList: Tag[];
};

const SubTagManagementList = ({ tagList }: SubTagManagementListProps) => {
  return (
    <>
      {tagList.map(tag => {
        const isMerged = tag.superContent !== "default";

        return (
          <ManagementListItem
            className="sub-tag-management__list-item"
            key={tag.id}
          >
            <span className="sub-tag-management__id">{tag.id}</span>
            <Link
              to={`/info/${tag.bookInfoId}`}
              className="sub-tag-management__title"
            >
              {tag.title}
            </Link>
            <Date
              className="sub-tag-management__created-at"
              date={tag.createdAt || ""}
            />
            <span className="sub-tag-management__nickname">{tag.login}</span>
            <EllipsisedSpan
              className={`sub-tag-management__content ${isMerged && "merged"}`}
            >
              #{tag.content}
              {isMerged ? (
                <Tooltip
                  description={`#${
                    tag.superContent || ""
                  } 태그 아래로 통합되었습니다.`}
                >
                  merged
                </Tooltip>
              ) : (
                ""
              )}
            </EllipsisedSpan>
            <VisibilityToggleButton
              className="sub-tag__management__visibility"
              id={`${tag.id}`}
              name={tag.content}
              isVisible={true} //TODO: visibility api에서 받아서 보이도록 수정 예정 (백엔드 수정요청함)
              onClick={(e: MouseEvent<HTMLButtonElement>) => {}} // TODO: visibility PATCH api 연결 필요
            />
          </ManagementListItem>
        );
      })}
    </>
  );
};

export default SubTagManagementList;
