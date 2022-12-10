import { useState } from "react";

const useTabFocus = (initialTab, tabList) => {
  const [currentIndex, setCurretIndex] = useState(initialTab);
  return {
    currentTab: tabList[currentIndex].type,
    changeTab: setCurretIndex,
  };
};

export default useTabFocus;
