import { useState } from "react";

export const useTabFocus = (initialTab, tabList) => {
  const [currentIndex, setCurretIndex] = useState(initialTab);
  return {
    currentTab: tabList[currentIndex].type,
    changeTab: setCurretIndex,
  };
};

