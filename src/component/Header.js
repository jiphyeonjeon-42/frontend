/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import LOGO from "../img/logo_.png";
import "../css/Header.css";

const Header = () => {
  return (
    <div className="header">
      <nav className="navbar">
        <div className="navbar__logo">
          <i className="fas fa-store-alt" />
          <img src={LOGO} className="logo" alt="logo" />
        </div>
        <ul className="navbar__menu">
          <li>
            <a href="">로그인</a>
          </li>
        </ul>
        <a href="" className="navbar__toggleBtn">
          <i className="fas fa-bars" />
        </a>
      </nav>
    </div>
  );
};

export default Header;
