import { HTMLProps, useState } from "react";
import fallback from "../../asset/img/image_onerror.svg";

type Size = number;
type Props = HTMLProps<HTMLImageElement> & { width?: Size; height?: Size };

const Image = ({ src, alt, width, height, ...props }: Props) => {
  return (
    <img
      {...props}
      src={src}
      alt={alt}
      style={{ width, height }}
      onError={e => (e.currentTarget.src = fallback)}
      loading="lazy"
    />
  );
};

export default Image;
