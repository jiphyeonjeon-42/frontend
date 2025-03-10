import { useState } from "react";
import { useAtomValue } from "jotai";
import { Link } from "react-router-dom";
import { userAtom } from "~/atom/userAtom";
import Logo from "~/asset/img/jiphyeonjeon_logo_without_text.svg";

type Props = {
  setModalOpened: (value: boolean) => void;
};

const ELibraryHeader = ({ setModalOpened }: Props) => {
  const { isLogin } = useAtomValue(userAtom);
  const [isFixed, setFixed] = useState(false);

  window.onscroll = () => setFixed(window.scrollY > 140);

  return (
    <>
      {/* 숨어있다가 스크롤이 특정영역을 넘어서면 보이는 헤더 */}
      <div className={`elibrary__fixed-header ${isFixed ? "" : "hidden"}`}>
        <Link
          className={`elibrary__fixed-title ${isFixed ? "" : "hidden"}`}
          to="/"
        >
          집현전
        </Link>
        <button
          onClick={() => setModalOpened(true)}
          className="elibrary__search-bar__hamburger"
        />
        <Link to="/search" className="elibrary__search-icon" />
      </div>
      {/* 페이지 상단에 보일 헤더 */}
      <div className="elibrary__header">
        <Link to="/">
          <img
            className="elibrary__header__logo-img"
            src={Logo}
            // src="https://42seoul.dkyobobook.co.kr/util/imageDisplay.ink?libraryCode=24946&target=toplogo&imagePath=/24946/images/top/24946_toplogo_0_202111221716514.png"
          />
        </Link>
        {isLogin ? (
          <Link to="/mypage" className="elibrary__header__login">
            내서재
          </Link>
        ) : null}
        <Link
          to={isLogin ? "/logout" : "/login"}
          className={`elibrary__header__login ${isLogin && "logout"}`}
        >
          {isLogin ? "로그아웃" : "로그인"}
        </Link>
      </div>
    </>
  );
};

export default ELibraryHeader;
