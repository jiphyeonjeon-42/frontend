import { FormEventHandler } from "react";
import { useRecoilValue } from "recoil";

import "~/asset/css/Review.css";
import { useNewDialog } from "~/hook/useNewDialog";
import { userAtom } from "~/atom/userAtom";
import { usePostReview } from "~/api/reviews/usePostReview";
import Button from "~/component/utils/Button";

type Props = {
  bookInfoId: number;
  resetTab: () => void;
};

const PostReview = ({ bookInfoId, resetTab }: Props) => {
  const { content, setContent, request } = usePostReview({
    bookInfoId: +bookInfoId,
    resetTab,
  });

  const user = useRecoilValue(userAtom);
  const hasPermissionToPostReview = user && user.userName !== user.email; // 인증된 유저는 이메일과 다른 닉네임을 가짐
  const isValidLength = content.length >= 10 && content.length <= 420;
  const { addDialogWithTitleAndMessage, addConfirmDialog } = useNewDialog();

  const postReviewOrDisplayError: FormEventHandler = e => {
    e.preventDefault();
    if (hasPermissionToPostReview && isValidLength) {
      addConfirmDialog(
        `${content} 리뷰등록 확인`,
        "리뷰를 등록하시겠습니까?",
        "",
        request,
      );
      return;
    }
    const title = !hasPermissionToPostReview
      ? "42 인증 후 리뷰 등록이 가능합니다."
      : "10자 이상 420자 이하로 입력해주세요.";

    addDialogWithTitleAndMessage(title, title, "");
  };

  return (
    <div className="do-review__review-box">
      <form
        className="do-review__review-form"
        onSubmit={postReviewOrDisplayError}
      >
        <textarea
          className="review-area font-12"
          value={content}
          onChange={e => setContent(e.target.value)}
          maxLength={420}
          required
          placeholder={
            user
              ? "10자 이상 420자 이내로 입력해주세요."
              : "로그인 후 리뷰 등록이 가능합니다."
          }
        />
        <div className="do-review__review-buttons">
          <Button type="submit" value="게시하기" color="red" />
        </div>
      </form>
    </div>
  );
};

export default PostReview;
