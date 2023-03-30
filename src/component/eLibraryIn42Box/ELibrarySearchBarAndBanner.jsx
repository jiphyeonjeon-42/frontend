import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BannerImage from "../../img/elibrary_copycat.png";

const ELibrarySearchBarAndBanner = ({ setModalOpened }) => {
  const [searchWord, setSearchWord] = useState("");
  const navigate = useNavigate();

  const syncronizeState = event => {
    setSearchWord(event.currentTarget.value);
  };
  const navigateToSearch = event => {
    event.preventDefault();
    navigate(`/search?search=${searchWord}`);
  };
  const flipAllMenu = event => {
    event.preventDefault();
    setModalOpened(true);
  };
  return (
    <>
      <form
        className="elibrary__search-bar__wrapper"
        onSubmit={navigateToSearch}
      >
        <select className="elibrary__search-bar__select">
          <option>통합검색</option>
          <option>제목</option>
          <option>저자명</option>
          <option>출판사</option>
          <option>책소개</option>
        </select>
        <fieldset className="elibrary__search-bar__search-bar">
          <input
            type="text"
            onChange={syncronizeState}
            placeholder="저자, 제목, 출판사, 책소개"
          ></input>
          <input type="submit" />
        </fieldset>
        <button
          onClick={flipAllMenu}
          className="elibrary__search-bar__hamburger"
        />
      </form>
      {/* 서치바 끝 배너 시작 */}
      <div className="elibrary__banner__menu">
        <Link className="search" to="/search">
          전체 책
        </Link>
        <a className="wish" href={import.meta.env.REACT_APP_WISH}>
          희망도서
        </a>
      </div>
      <div className="elibrary__banner__banner">
        <img
          className="elibrary__banner__banner-img"
          src={BannerImage}
          alt="메인배너"
          draggable="false"
        />
      </div>
    </>
  );
};

export default ELibrarySearchBarAndBanner;
