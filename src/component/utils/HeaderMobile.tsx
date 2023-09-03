import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Image from "./Image";
import Logo from "~/asset/img/jiphyeonjeon_logo.svg";
import Hamburger from "~/asset/img/Hamburger_OwlDsgnr.png";
import SearchBook from "~/asset/img/Search_VectorsMarket.png";
import HeaderModal from "./HeaderModal";
import "~/asset/css/HeaderMobile.css";
import SearchRanking from "./SearchRanking";

const HeaderMobile = () => {
  const [isDrawerOpened, setIsDrawerOpened] = useState(false);
  const [isFixed, setFixed] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setFixed(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsDrawerOpened(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isDrawerOpened) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isDrawerOpened]);

  return (
    <>
      <header className={`header-mobile__wrapper ${isFixed ? "fixed" : ""}`}>
        <Link className="header-mobile__logo" to={{ pathname: `/` }}>
          <Image src={Logo} alt="logo" />
        </Link>
        <nav className="header-mobile__gnb__wrapper">
          <Link className="header-mobile__search" to={{ pathname: `/search` }}>
            <Image src={SearchBook} alt="search" />
          </Link>
          <button
            type="button"
            className="header-mobile__hamburger"
            onClick={() => setIsDrawerOpened(true)}
          >
            <Image src={Hamburger} alt="dropdown" />
          </button>
          <SearchRanking />
        </nav>
      </header>
      {isDrawerOpened && (
        <HeaderModal setHeaderModal={() => setIsDrawerOpened(false)} />
      )}
    </>
  );
};

export default HeaderMobile;
