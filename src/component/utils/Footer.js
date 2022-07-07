import React from "react";
import { Link } from "react-router-dom";
import Youtube from "../../img/youtube.svg";
import Github from "../../img/github.svg";
import Information from "../../img/information_icon.svg";
import "../../css/Footer.css";

const Footer = () => {
  return (
    <footer className="footer font-16 color-ff">
      <div className="footer-wrapper">
        <div className="footer__name-contents">
          <div className="footer__name">42서울 집현전</div>
          <div className="footer__contents">
            <a
              target="_blank"
              rel="noreferrer"
              className="footer__icon"
              href="https://www.youtube.com/c/%EC%9D%B4%EB%85%B8%EB%B2%A0%EC%9D%B4%EC%85%98%EC%95%84%EC%B9%B4%EB%8D%B0%EB%AF%B8/featured"
            >
              <img className="footer__icon" src={Youtube} alt="youtube" />
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              className="footer__icon footer__icon-margin"
              href="https://github.com/jiphyeonjeon-42"
            >
              <img className="icon-github" src={Github} alt="github" />
            </a>
            <Link className="footer__icon" to={{ pathname: `/information` }}>
              <img
                className="icon-information"
                src={Information}
                alt="information"
              />
            </Link>
          </div>
        </div>
        <div className="footer__contact-copyright">
          <div className="footer__contact__address">
            <span className="footer__title color-d5">주소</span>
            <span className="footer__description color-d5">
              서울시 강남구 개포로 416 이노베이션 아카데미
            </span>
          </div>
          <div className="footer__contact__slack">
            <span className="footer__title color-d5">문의</span>
            <a href="https://42born2code.slack.com/archives/C0174FTH8N6">
              <span className="footer__description color-d5">
                #42seoul_club_42jiphyeonjeon
              </span>
            </a>
          </div>
          <div className="footer__copyright color-81">
            Copyright 2021. Jiphyeonjeon All rights reserved.
          </div>
        </div>
        <div className="footer__information color-d5">
          <Link className="color-ff" to={{ pathname: `/information` }}>
            이용안내
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
