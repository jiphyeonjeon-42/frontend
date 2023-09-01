import { useRecoilValue } from "recoil";
import { Link } from "react-router-dom";
import { basicGnbMenu } from "~/constant/headerMenu";
import userState from "~/atom/userState";
import Image from "./Image";
import HeaderDefaultLNB from "./HeaderDefaultLNB";
import Logo from "~/asset/img/jiphyeonjeon_logo.svg";
import "~/asset/css/HeaderDefault.css";

const HeaderDefault = () => {
  const user = useRecoilValue(userState);

  const gnbMenu = user.isLogin
    ? basicGnbMenu.slice(0, basicGnbMenu.length - 1) // basicGnbMenu의 마지막 요소는 "로그인", 이미 로그인 상태면 제외
    : basicGnbMenu;

  return (
    <header className="header">
      <section className="header-wrapper">
        <div className="header__logo">
          <Link to="/">
            <Image src={Logo} className="logo_img" alt="logo" />
          </Link>
        </div>
        <nav className="header__gnb">
          <ul className="gnb__menu">
            {gnbMenu.map(menu => {
              return (
                <li key={menu.linkTo}>
                  <Link className="gnb__button" to={menu.linkTo}>
                    <Image
                      src={menu.img}
                      className="gnb__icon gnb__info__icon"
                      alt={menu.imgAlt}
                    />
                    <span className="gnb__text font-18">{menu.text}</span>
                  </Link>
                </li>
              );
            })}
            {user.isLogin && <HeaderDefaultLNB />}
          </ul>
        </nav>
      </section>
    </header>
  );
};

export default HeaderDefault;
