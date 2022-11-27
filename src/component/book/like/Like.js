import React, { useState } from "react";
import Image from "../../utils/Image";
import UserEdit from "../../../img/edit.svg";
import "../../../css/BookDetail.css";
import "../../../css/reset.css";

const Like = () => {
  // const [like, setLike] = useState(false);
  const [number, setNumber] = useState(0);

  const handleLike = () => {
    setNumber(() => number + 1);
  };

  // useEffect(() => {
  //   setLike(() => !like);
  // }, [like]);
  return (
    <div>
      <button
        type="button"
        onClick={() => handleLike()}
        className="like_button filter-button"
      >
        <Image
          className="like__icon"
          src={UserEdit}
          // src={`${filter.isWaiting ? RedCheckIcon : CheckIcon}`}
          alt=""
        />
        <span
        // className={`proceeding-finish__text ${
        //   filter.isWaiting ? "color-red" : "color-a4"
        // }`}
        >
          {`좋아요 ${number}`}
        </span>
      </button>
    </div>
  );
};

export default Like;
