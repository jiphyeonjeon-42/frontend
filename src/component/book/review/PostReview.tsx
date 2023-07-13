import {
  ChangeEventHandler,
  FormEventHandler,
  ReactNode,
  useState,
} from "react";
import "../../../asset/css/Review.css";
import Button from "../../utils/Button";
import { useNewDialog } from "../../../hook/useNewDialog";

type Props = {
  onClickPost: (post: string) => void;
};

const PostReview = ({ onClickPost }: Props) => {
  const [content, setContent] = useState("");
  const checkLogin = JSON.parse(window.localStorage.getItem("user") || "{}");
  const checkValidUser = () => {
    const user = JSON.parse(window.localStorage.getItem("user") || "{}");
    if (user) {
      if (user.userName === user.email) {
        return false;
      }
    }
    return true;
  };

  const onChange: ChangeEventHandler<HTMLTextAreaElement> = e => {
    setContent(e.target.value);
  };

  const { addDialogWithTitleAndMessage, addConfirmDialog } = useNewDialog();
  const submitReview = () => {
    const validUser = checkValidUser();
    if (validUser === false) {
      const title = "42 인증 후 리뷰 등록이 가능합니다.";
      addDialogWithTitleAndMessage(title, title, "");
      return;
    }
    onClickPost(content);
  };

  const onSubmitHandler: FormEventHandler = e => {
    e.preventDefault();
    addConfirmDialog(
      `${content} 리뷰등록 확인`,
      "리뷰를 등록하시겠습니까?",
      "",
      submitReview,
    );
  };

  return (
    <div className="do-review__review-box">
      <form className="do-review__review-form" onSubmit={onSubmitHandler}>
        <textarea
          className="review-area font-12"
          value={content}
          onChange={onChange}
          maxLength={420}
          required
          placeholder={
            checkLogin
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
