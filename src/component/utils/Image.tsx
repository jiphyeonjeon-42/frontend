import { HTMLProps, useState } from "react";
import fallback from "../../img/image_onerror.svg";

type Size = number | `${number}px`;
type Props = HTMLProps<HTMLImageElement> & { width?: Size; height?: Size };

const Image = ({ src, alt, width, height, ...props }: Props) => {
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
