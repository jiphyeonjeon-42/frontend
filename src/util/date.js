const dateFormat = string => {
  return string?.slice(0, 10)?.replace(".", "-") || "";
};

export default dateFormat;
