import React from "react";
import { Link } from "react-router-dom";
import Youtube from "../../img/youtube.svg";
import Github from "../../img/github.svg";
import "../../css/Footer.css";

const Footer = () => {
  return (
    <footer className="footer font-16">
      <div className="footer-wrapper">
        <div className="footer__name color-ff">
          <div className="footer__text">42서울 집현전</div>
          <div className="footer__icon">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.youtube.com/c/%EC%9D%B4%EB%85%B8%EB%B2%A0%EC%9D%B4%EC%85%98%EC%95%84%EC%B9%B4%EB%8D%B0%EB%AF%B8/featured"
            >
              <img
                className="footer__icon icon-youtube"
                src={Youtube}
                alt="youtube"
              />
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/jiphyeonjeon-42"
            >
              <img
                className="footer__icon icon-github"
                src={Github}
                alt="github"
              />
            </a>
          </div>
        </div>
        <div className="footer__address">
          <div className="footer__address__title color-ff">
            <div className="footer__text">주소</div>
            <div className="footer__text">문의</div>
            <div className="footer__copyright color-81">
              Copyright 2021. Jiphyeonjeon All rights reserved.
            </div>
          </div>
          <div>
            <div className="footer__text color-d5">
              서울시 강남구 개포로 416 이노베이션 아카데미
            </div>
            <div className="footer__text color-d5">
              #42seoul_club_42jiphyeonjeon
            </div>
          </div>
        </div>
        <div className="footer__information color-ff">
          <Link className="color-ff" to={{ pathname: `/information` }}>
            이용안내
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
