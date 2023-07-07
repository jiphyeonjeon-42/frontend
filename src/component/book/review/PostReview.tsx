import {
  ChangeEventHandler,
  FormEventHandler,
  ReactNode,
  useState,
} from "react";
import "../../../asset/css/Review.css";
import Button from "../../utils/Button";

type Props = {
  onClickPost: (post: string) => void;
  setDialogConfig: (config: any) => void;
  Dialog: ReactNode;
  openDialog: () => void;
  closeDialog: () => void;
  config: any;
  setOpenTitleAndMessage: (
    title: string,
    message: string,
    afterClose?: () => void,
  ) => void;
};

const PostReview = ({
  onClickPost,
  Dialog,
  config,
  openDialog,
  closeDialog,
  setDialogConfig,
  setOpenTitleAndMessage,
}: Props) => {
  const [content, setContent] = useState("");
  const checkLogin = JSON.parse(window.localStorage.getItem("user") || "");
  const checkValidUser = () => {
    const user = JSON.parse(window.localStorage.getItem("user") || "");
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

  const submitReview = () => {
    const validUser = checkValidUser();
    if (validUser === false) {
      setOpenTitleAndMessage(
        "42 인증 후 리뷰 등록이 가능합니다.",
        "",
        closeDialog,
      );
      return;
    }
    onClickPost(content);
    closeDialog();
  };

  const onSubmitHandler: FormEventHandler = e => {
    e.preventDefault();
    console.log(content);
    setDialogConfig({
      ...config,
      title: "리뷰를 등록하시겠습니까?",
      buttonAlign: "basic",
      numberOfButtons: 2,
      firstButton: {
        text: "확인하기",
        color: "red",
        onClick: submitReview,
      },
      secondButton: {
        text: "취소하기",
        color: "grey",
        onClick: closeDialog,
      },
    });
    openDialog();
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
      {Dialog}
    </div>
  );
};

export default PostReview;
