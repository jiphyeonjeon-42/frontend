import { MouseEvent } from "react";
import ManagementListItem from "../utils/ManagementListItem";
import VisibilityToggleButton from "../utils/VisibilityToggleButton";
import { Link } from "react-router-dom";
import Date from "../utils/Date";
import { Tag } from "../../types/Tag";
import Tooltip from "../utils/Tooltip";
import EllipsisedSpan from "../utils/EllipsisedSpan";
import useDialog from "../../hook/useDialog";
import { usePatchTagsSub } from "../../api/tags/usePatchTagsSub";

type SubTagManagementListProps = {
  tagList: Tag[];
};

const SubTagManagementList = ({ tagList }: SubTagManagementListProps) => {
  const { Dialog, setOpenTitleAndMessage, setConfig, defaultConfig, setOpen } =
    useDialog();
  const { setParams } = usePatchTagsSub({ setOpenTitleAndMessage });

  const confirmChangeVisibility = (e: MouseEvent<HTMLButtonElement>) => {
    const { id, name: content, value } = e.currentTarget;

    const isHidden = value === "false";
    const job = isHidden ? "공개" : "비공개";
    setConfig({
      ...defaultConfig,
      title: `태그를 ${job}하시겠습니까?`,
      message: `태그내용 : ${content}`,
      numberOfButtons: 2,
      firstButton: {
        ...defaultConfig.firstButton,
        text: `${job}하기`,
        onClick: () => {
          setParams({ id: +id, visibility: isHidden ? "public" : "private" });
        },
      },
    });
    setOpen();
  };
  return (
    <>
      <Dialog />
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
            </EllipsisedSpan>
            <span className="sub-tag-management__merged">
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
            </span>
            <VisibilityToggleButton
              className="sub-tag__management__visibility"
              id={`${tag.id}`}
              name={tag.content}
              isVisible={tag.visibility === "public"}
              onClick={confirmChangeVisibility}
            />
          </ManagementListItem>
        );
      })}
    </>
  );
};

export default SubTagManagementList;
