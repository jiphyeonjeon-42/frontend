import React, { useState } from "react";
import ELibraryHeader from "./ELibraryHeader";
import ELibrarySearchBarAndBanner from "./ELibrarySearchBarAndBanner";
import ELibraryNew from "./ELibraryNew";
import ELibraryPopular from "./ELibraryPopular";
import ELibraryFooter from "./ELibraryFooter";
import HeaderModal from "../utils/HeaderModal";
import "../../css/ELibraryCopyCat.css";

const ELibraryCopyCat = () => {
  const [isModalOpened, setModalOpened] = useState(false);

  return (
    <div>
      <ELibraryHeader setModalOpened={setModalOpened} />
      <ELibrarySearchBarAndBanner setModalOpened={setModalOpened} />
      <ELibraryNew />
      <ELibraryPopular />
      <ELibraryFooter />
      {isModalOpened ? <HeaderModal setHeaderModal={setModalOpened} /> : null}
    </div>
  );
};

export default ELibraryCopyCat;
