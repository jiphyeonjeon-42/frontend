import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "../../img/arrow_right_circle.svg";
import "../../css/ScrollTopButton.css";

const ScrollTopButton = ({ rightRem, bottomRem }) => {
  const [active, setActive] = useState(false);
  const [activeScrollY, setActiveScrollY] = useState(0);
  const [inActiveScrollY, setInActiveScrollY] = useState(0);
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
      } else setActive(false);
    };
    window.addEventListener("scroll", getScrollScope);
    return () => {
      window.removeEventListener("scroll", getScrollScope);
    };
  }, [activeScrollY, inActiveScrollY]);

  return (
    <div
      className="scroll-top-button__wrapper"
      style={{ right: `${rightRem}rem` }}
    >
      <button
        className="scroll-top-button__button"
        style={{ bottom: `${bottomRem}rem` }}
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
