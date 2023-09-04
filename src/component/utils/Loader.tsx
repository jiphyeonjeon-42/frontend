import { ComponentProps, PropsWithChildren, ReactNode } from "react";
import "~/asset/css/Loader.css";

type Props = ComponentProps<"div"> & {
  hasBackdrop?: boolean;
};

const Loader = ({ className, hasBackdrop, ...rest }: Props) => {
  const BackDrop = ({ children }: PropsWithChildren) =>
    hasBackdrop ? (
      <div className="loader__backdrop">{children}</div>
    ) : (
      <>{children}</>
    );

  return (
    <BackDrop>
      <div {...rest} className={`loader__loader ${className}`} />
    </BackDrop>
  );
};

export default Loader;
