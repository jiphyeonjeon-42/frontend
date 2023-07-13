import { ChangeEventHandler, useState } from "react";
import axiosPromise from "../../../util/axios";
import { splitDate } from "../../../util/date";
import Image from "../../utils/Image";
import UserEdit from "../../../asset/img/edit.svg";
import DeleteButton from "../../../asset/img/x_button.svg";
import "../../../asset/css/Review.css";
import { User } from "@sentry/react";
import { Review } from "../../../type";
import { useNewDialog } from "../../../hook/useNewDialog";

type Props = {
  data: Review;
  nickname: string;
  createdAt: string;
  checkLogin: User;
  type: string;
  onClickDel: (id: number) => void;
};

const HandleReview = ({
  data,
  nickname,
  createdAt,
  checkLogin,
  type,
  onClickDel,
}: Props) => {
  const [fixReview, setFixReview] = useState(false);
  const [content, setContent] = useState(data.content);
  const uploadDate = splitDate(createdAt)[0];
  const getPermission = () => {
    if (checkLogin === null) {
      return false;
    }
    const user = checkLogin.userName;
    const checkReviewerNickname = user === nickname;
    return checkReviewerNickname;
  };
  const permission = getPermission();
  const doFixBtn = () => {
    return setFixReview(!fixReview);
  };

  const cancelFixBtn = () => {
    setContent(data.content);
    return setFixReview(!fixReview);
  };

  const deleteReview = () => {
    onClickDel(data.reviewsId);
  };

  const { addConfirmDialog, addDialogWithTitleAndMessage } = useNewDialog();
  const deleteBtn = () => {
    addConfirmDialog(
      "삭제확인",
      "리뷰를 삭제하시겠습니까?",
      data.content,
      deleteReview,
    );
  };

  const patchReview = () => {
    const text = {
      content,
    };
    axiosPromise("put", `/reviews/${data.reviewsId}`, text)
      .then(() => {
        setFixReview(!fixReview);
      })
      .catch(() => {
        addDialogWithTitleAndMessage(
          "error",
          "10자 이상 420자 이하로 입력해주세요.",
          "",
        );
      });
  };

  const putBtn = () => {
    patchReview();
  };

  const reviewFixArea: ChangeEventHandler<HTMLTextAreaElement> = e => {
    setContent(e.target.value);
  };

  return (
    <div
      className={`showReview__${
        type === "bookReviews" ? "book" : "my"
      }-review-box`}
    >
      <div className="review-info">
        {type === "bookReviews" ? (
          <span className="reviewer-name font-12-bold">
            {nickname ?? "미인증 유저"}
          </span>
        ) : null}
        <span className="review-day font-12">{uploadDate}</span>
      </div>
      <div className="review-content">
        {type === "bookReviews" ? null : (
          <div className="review-content-book-title font-14-bold">
            {data.title}
          </div>
        )}
        {fixReview ? (
          <div>
            <textarea
              className="review-content-fix-area font-12"
              value={content}
              onChange={reviewFixArea}
            />
          </div>
        ) : (
          <div>
            <textarea
              className="review-content-area font-12"
              value={content}
              disabled
            />
          </div>
        )}
      </div>
      {permission ? (
        <div className="review-manage">
          {fixReview ? (
            <div className="review-manage__fix-buttons font-12">
              <button type="button" onClick={putBtn}>
                <span className="fix-text">수정하기</span>
              </button>
              <button
                className="review-manage__fix-cancle"
                type="button"
                onClick={cancelFixBtn}
              >
                취소하기
              </button>
            </div>
          ) : (
            <div className="review-manage__start-fix-buttons font-12">
              <button type="button" onClick={doFixBtn}>
                수정
                <Image
                  className="review-manage__button-img"
                  src={UserEdit}
                  alt=""
                />
              </button>
              <button type="button" onClick={deleteBtn}>
                삭제
                <Image
                  className="review-manage__button-img"
                  src={DeleteButton}
                  alt=""
                />
              </button>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default HandleReview;

HandleReview.defaultProps = {
  data: {
    bookInfoId: null,
    content: null,
    reviewsId: null,
    title: null,
  },
  nickname: null,
  checkLogin: null,
};
