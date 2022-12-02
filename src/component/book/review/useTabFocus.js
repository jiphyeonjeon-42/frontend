import { useState } from "react";
import "../../../css/Tabs.css";
import "../../../css/Review.css";

const useTabFocus = (initialTab, tabList) => {
  const [currentIndex, setCurretIndex] = useState(initialTab);
  return {
    currentTab: tabList[currentIndex].type,
    changeTab: setCurretIndex,
  };
};

export default useTabFocus;
