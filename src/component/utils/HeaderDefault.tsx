import { useRecoilValue } from "recoil";
import { Link } from "react-router-dom";
import { basicGnbMenu } from "~/constant/headerMenu";
import userState from "~/atom/userState";
import Image from "./Image";
import HeaderDefaultLNB from "./HeaderDefaultLNB";
import Logo from "~/asset/img/jiphyeonjeon_logo.svg";
import "~/asset/css/HeaderDefault.css";
import SearchRanking from "./SearchRanking";

const HeaderDefault = () => {
  const user = useRecoilValue(userState);

  const gnbMenu = user.isLogin
    ? basicGnbMenu.slice(0, basicGnbMenu.length - 1) // basicGnbMenu의 마지막 요소는 "로그인", 이미 로그인 상태면 제외
    : basicGnbMenu;

  return (
    <header className="header__wrapper">
      <Link to="/" className="header__logo">
        <Image src={Logo} alt="집현전 로고" />
      </Link>
      <nav className="header__gnb__wrapper">
        {gnbMenu.map(menu => (
          <Link
            className="header__gnb__menu"
            key={menu.linkTo}
            to={menu.linkTo}
          >
            <Image
              className="header__gnb__icon"
              src={menu.img}
              alt={menu.imgAlt}
            />
            <span>{menu.text}</span>
          </Link>
        ))}
        {user.isLogin && <HeaderDefaultLNB />}
        <SearchRanking />
      </nav>
    </header>
  );
};

export default HeaderDefault;
