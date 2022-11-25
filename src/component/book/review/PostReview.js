import React, { useState } from "react";
import PropTypes from "prop-types";
import "../../../css/Review.css";
import Button from "../../utils/Button";

const PostReview = ({ onClickPost }) => {
  const [content, setContent] = useState(null);

  const onChange = e => {
    setContent(e.target.value);
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    onClickPost(content);
  };

  return (
    <div className="do-review__review-box">
      <form className="do-review__review-form" onSubmit={onSubmitHandler}>
        <textarea
          className="review-area font-16"
          value={content}
          type="text-area"
          onChange={onChange}
        />
        <div className="do-review__review-buttons">
          <Button type="submit" value="게시하기" color="red" />
        </div>
      </form>
    </div>
  );
};

export default PostReview;

PostReview.propTypes = {
  onClickPost: PropTypes.func.isRequired,
};
