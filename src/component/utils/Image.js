import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import IMGERR from "../../img/image_onerror.svg";

const Image = ({ className, alt, src, width, height, draggable, value }) => {
  const ref = useRef(null);
  function subtituteImg(e) {
    e.target.src = IMGERR;
  }
  useEffect(() => {
    if (width || height) {
      let styleText = "";
      if (width) styleText += `width: ${width}px; `;
      if (height) styleText += `height: ${height}px; `;
      ref.current.style = styleText;
    }
  }, [width, height]);

  return (
    <img
      alt={alt}
      src={src || IMGERR}
      className={className || ""}
      onError={subtituteImg}
      loading="lazy"
      ref={ref}
      draggable={draggable}
      value={value}
    />
  );
};

export default Image;

Image.propTypes = {
  className: PropTypes.string,
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  draggable: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Image.defaultProps = {
  className: "",
  width: undefined,
  height: undefined,
  draggable: true,
  value: "",
};
