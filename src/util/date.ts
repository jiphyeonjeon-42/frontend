import { User } from "../type";

/*  기본적인 날짜표시 형식 20yy-mm-dd */
const dateReg = /^(20\d{2})-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/;

export const isFormattedDate = (string: string) => RegExp(dateReg).test(string);
export const dateFormat = (string: string) => {
  return string?.slice(0, 10)?.replace(".", "-") || "";
};

export const nowDate = dateFormat(new Date().toISOString());
export const getYear = (string: string) => dateFormat(string).substring(0, 4);
export const getMonth = (string: string) => dateFormat(string).substring(5, 7);
export const getDay = (string: string) => dateFormat(string).substring(8, 10);

/* [yyyy, mm, dd] 형식의 배열 */
export const splitDate = (string: string) =>
  dateFormat(string)
    .match(dateReg)
    ?.slice(1)
    ?.map(v => parseInt(v)) || [];

/* string 형식의 날짜 비교 */
export const compareDate = (
  date1: string,
  date2 = nowDate,
  compare: (date1: string, date2: string) => boolean,
) => {
  return compare(dateFormat(date1), dateFormat(date2));
};

export const dateLessThan = (date: string, now = nowDate) => {
  return compareDate(date, now, (date1, date2) => date1 < date2);
};

/* 날짜 및 시간 계산 */
// Date 객체는 타임존이 다를 수 있어 조심해야

export const hourToMilliSeconds = (hours: number) => hours * 60 * 60 * 1000;
export const dayToMilliSeconds = (days: number) =>
  days * hourToMilliSeconds(24);
export const addHourDateObject = (dateObject: Date, hours: number) =>
  new Date(dateObject.valueOf() + hourToMilliSeconds(hours));

export const addDayDateObject = (dateObject: Date, days: number) =>
  new Date(dateObject.valueOf() + dayToMilliSeconds(days));

export const isExpiredDate = (expireDateString: string) => {
  return new Date() >= new Date(expireDateString);
};

export const addDay = (num: number, date = nowDate) => {
  if (!isFormattedDate(date)) return date;
  const dateObj = new Date(date);
  return dateFormat(addDayDateObject(dateObj, num).toISOString());
};

/* lending 관련 날짜 함수 */

export const lendingRestriction = (user: User) => {
  // 대출제한날짜는 이미 반납한 대출건의 연체제한 + 대출중인 도서의 연체일로 계산
  const restrictionDate =
    !user.penaltyEndDate || dateLessThan(user.penaltyEndDate)
      ? addDay(user.overDueDay) // 오늘 날짜 + 대출중인 도서를 오늘 반납시 받게 될 연체일
      : addDay(user.overDueDay, user.penaltyEndDate);
  // 이미 반납한 대출건의 연체 제한날짜 + 대출중인 도서를 오늘 반납시 받게 될 연체일

  // 대출제한날짜가 현재 날짜보다 크면 대출제한
  const isRestricted = compareDate(
    restrictionDate,
    nowDate,
    (d1, d2) => d1 > d2,
  );

  return { isRestricted, restrictionDate };
};
