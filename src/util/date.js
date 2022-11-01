import { isNumber, isString } from "./typeCheck";
/*  기본적인 날짜표시 형식 20yy-mm-dd */

const dateReg = /^(20\d{2})-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/;

export const isFormattedDate = string => RegExp(dateReg).test(string);
export const dateFormat = string => {
  if (isFormattedDate(string)) return string;
  return string?.slice(0, 10)?.replace(".", "-") || "";
};

export const nowDate = dateFormat(new Date().toISOString());
export const getYear = string => dateFormat(string).substring(0, 4);
export const getMonth = string => dateFormat(string).substring(5, 7);
export const getDay = string => dateFormat(string).substring(8, 10);

/* [string, "yyyy", "mm", "dd"] 형식의 배열 */
export const splitDate = string => dateFormat(string).match(dateReg);

/* string 형식의 날짜 비교 */
export const dateLessThan = (date, now = nowDate) => {
  if (!isString(date) || !isString(now)) return undefined;
  return dateFormat(date) < now;
};

/* 날짜 및 시간 계산 */
// Date 객체는 타임존이 다를 수 있어 조심해야

export const hourToMilliSeconds = hours => hours * 60 * 60 * 1000;
export const dayToMilliSeconds = days => days * hourToMilliSeconds(24);
export const addHourDateObject = (dateObject, hours) =>
  new Date(dateObject.valueOf() + hourToMilliSeconds(hours));

export const addDayDateObject = (dateObject, days) =>
  new Date(dateObject.valueOf() + dayToMilliSeconds(days));

export const isExpiredDate = expireDateString => {
  return new Date() >= new Date(expireDateString);
};

export const addDay = (num, date = nowDate) => {
  if (!isString(date) || !isNumber(num)) return undefined;
  const [, year, month, day] = splitDate(dateFormat(date));
  const dateObj = new Date(year, month - 1, day);
  return dateFormat(addDayDateObject(dateObj, num).toISOString());
};
