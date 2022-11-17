import React, { useState } from "react";
import PropTypes from "prop-types";
import "../../../css/Review.css";

const PostReview = ({ onClickPost }) => {
  const [content, setContent] = useState(null);

  const onChange = e => {
    setContent(e.target.value);
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    onClickPost(e.target.textContent);
  };

  return (
    <div className="doReview__review-box">
      <form onSubmit={onSubmitHandler}>
        <textarea
          className="review-area"
          value={content}
          type="text-area"
          onChange={onChange}
        />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
};

export default PostReview;

PostReview.propTypes = {
  onClickPost: PropTypes.func.isRequired,
};
