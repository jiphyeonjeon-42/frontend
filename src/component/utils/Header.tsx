import { useBreakPoint } from "~/hook/useBreakPoint";
import { breakPoint } from "~/constant/breakPoint";
import HeaderMobile from "./HeaderMobile";
import HeaderDefault from "./HeaderDefault";

const Header = () => {
  const isMobile = useBreakPoint(breakPoint.tablet); // 타블렛 이하면 모바일로 간주

  return isMobile ? <HeaderMobile /> : <HeaderDefault />;
};

export default Header;
