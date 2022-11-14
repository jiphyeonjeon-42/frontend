import React, { useRef, useEffect } from "react";
import { BrowserQRCodeSvgWriter } from "@zxing/library";
import PropTypes from "prop-types";

const QRGenerator = ({
  string,
  qrWidth = 100,
  qrHeight = 100,
  svgClassName,
}) => {
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

QRGenerator.propTypes = {
  string: PropTypes.string.isRequired,
  qrWidth: PropTypes.number,
  qrHeight: PropTypes.number,
  svgClassName: PropTypes.string,
};
