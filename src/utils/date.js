const isExpiredDate = expireDateString => {
  const nowDate = new Date();
  const expireDate = new Date(expireDateString);
  return nowDate >= expireDate;
};

export default isExpiredDate;
