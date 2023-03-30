import React from "react";
import { Link } from "react-router-dom";

const ELibraryTitleWithMore = ({ title }) => {
  return (
    <div className="elibrary__title">
      <span>{title}</span>
      <Link to="/search">더보기</Link>
    </div>
  );
};

export default ELibraryTitleWithMore;
