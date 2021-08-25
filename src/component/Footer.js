/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "../css/Footer.css";
import { useRecoilValue } from "recoil";
import { pageEndState } from "./Books";

const Footer = () => {
  const isEnd = useRecoilValue(pageEndState);
  return (
    <footer>
      {isEnd ? (
        <div className="footer">
          <h1 className="footer__text">Footer</h1>
        </div>
      ) : (
        <div className="footer" />
      )}
    </footer>
  );
};

export default Footer;
