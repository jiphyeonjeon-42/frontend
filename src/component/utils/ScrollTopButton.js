import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "../../img/arrow_right_circle.svg";
import "../../css/ScrollTopButton.css";

const ScrollTopButton = ({ rightRem, bottomRem }) => {
  const [active, setActive] = useState(false);
  const [activeScrollY, setActiveScrollY] = useState(0);
  const [inActiveScrollY, setInActiveScrollY] = useState(0);
  const [footerShownHeigtRem, setFooterShownHeightRem] = useState(0);
  const onClickBtn = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const getScrollScope = () => {
      setActiveScrollY(
        document.getElementsByClassName("banner")[0].scrollHeight,
      );
      setInActiveScrollY(
        document.body.scrollHeight -
          window.innerHeight -
          document.getElementsByClassName("footer")[0].scrollHeight,
      );
      if (
        window.scrollY > activeScrollY / 2 &&
        window.scrollY < inActiveScrollY
      ) {
        setActive(true);
      } else if (window.scrollY >= inActiveScrollY) {
        setFooterShownHeightRem(
          window.scrollY +
            window.innerHeight -
            (document.body.scrollHeight -
              document.getElementsByClassName("footer")[0].scrollHeight),
        );
      } else {
        setActive(false);
      }
    };
    window.addEventListener("scroll", getScrollScope);
    return () => {
      window.removeEventListener("scroll", getScrollScope);
    };
  }, [activeScrollY, inActiveScrollY, footerShownHeigtRem]);

  // rightRem : 사용하는 요소에서의 right
  // bottomRem : 화면에서의 bottom
  // footerShownHeight : footer가 화면에 보이는 만큼의 rem
  return (
    <div
      className="scroll-top-button__wrapper"
      style={{ right: `${rightRem}rem` }}
    >
      <button
        className="scroll-top-button__button"
        style={{
          bottom: `${
            parseInt(bottomRem, 10) +
            (footerShownHeigtRem > 0 ? footerShownHeigtRem * 0.1 : 0)
          }rem`,
        }}
        type="button"
        onClick={onClickBtn}
      >
        <img
          className={`scroll-top-button__image ${active && "active"}`}
          src={Button}
          alt="scroll-top-button"
        />
      </button>
    </div>
  );
};

ScrollTopButton.propTypes = {
  rightRem: PropTypes.number.isRequired,
  bottomRem: PropTypes.number.isRequired,
};

export default ScrollTopButton;
