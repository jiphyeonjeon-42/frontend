// eslint-disable-next-line import/prefer-default-export
export const parseBookIdFromQRLabel = QRText => {
  return parseInt(QRText.split(" ")[0], 10);
};
