import { useRef, useEffect } from "react";
import { BrowserQRCodeSvgWriter } from "@zxing/library";

type QRGeneratorProps = {
  string: string;
  qrWidth?: number;
  qrHeight?: number;
  svgClassName?: string;
};

const QRGenerator = ({
  string,
  qrWidth,
  qrHeight,
  svgClassName,
}: QRGeneratorProps) => {
  const imgRef = useRef(null);
  useEffect(() => {
    const writer = new BrowserQRCodeSvgWriter();
    writer.writeToDom(imgRef.current, string, qrWidth, qrHeight);
  }, []);

  return <svg ref={imgRef} className={svgClassName} />;
};

export default QRGenerator;

QRGenerator.defaultProps = {
  qrWidth: 100,
  qrHeight: 100,
  svgClassName: "",
};
