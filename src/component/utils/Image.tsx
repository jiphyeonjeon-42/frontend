import { useRef, useEffect, HTMLProps, useState } from "react";
import fallback from "../../img/image_onerror.svg";

const Image = ({
  src,
  alt,
  width,
  height,
  ...props
}: HTMLProps<HTMLImageElement>) => {
  const [error, setError] = useState(false);
  return (
    <img
      {...props}
      src={error ? fallback : src}
      alt={alt}
      style={{ width, height }}
      onError={() => setError(true)}
      loading="lazy"
    />
  );
};

export default Image;
