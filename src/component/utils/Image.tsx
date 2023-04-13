import { useRef, useEffect } from "react";
import IMGERR from "../../img/image_onerror.svg";

type ImageProps = {
  className?: string;
  alt: string;
  src: string;
  width?: string;
  height?: string;
  draggable?: boolean;
  value?: string | number;
};

const Image = ({
  className,
  alt,
  src,
  width,
  height,
  draggable,
  value,
}: ImageProps) => {
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

Image.defaultProps = {
  className: "",
  width: undefined,
  height: undefined,
  draggable: true,
  value: "",
};
