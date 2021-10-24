import React from "react";
import BackGround from "./BackGround";
import "../../css/NotFound.css";

const NotFound = () => {
  return (
    <div>
      <BackGround page="not-found" />
      <div className="not-found__text color-ff">
        <div className="font-48-bold">404</div>
        <div className="font-40-bold">Not Found</div>
      </div>
    </div>
  );
};

export default NotFound;
