const lendingPostErrorCase = errorCode => {
  switch (errorCode) {
    case 2:
      return `더이상 대출이 불가능한 카뎃입니다.\n이미 2권 이상 대출했거나 연체패널티 기간입니다.`;
    case 3:
      return "예약자가 있어 대출하실 수 없습니다.";
    case 4:
      return "이미 대출 중인 책입니다.";
    default:
      return "예상치 못한 오류가 발생했습니다";
  }
};

const returningPostErrorCase = errorCode => {
  return `오류 확인 및 수정을 위해 slack 으로 문의 부탁드립니다!.\n returnings error code : ${errorCode}`;
};

const reservationPostErrorCase = errorCode => {
  switch (errorCode) {
    case 2:
      return "대출되지 않은 책은 예약하실 수 없습니다";
    case 3:
      return "이미 예약하신 책입니다.";
    case 4:
      return "예약은 최대 2권까지만 가능합니다.";
    case 6:
      return "본인이 대출중인 책은 예약이 불가능합니다.";
    default:
      return "예상치 못한 오류가 발생했습니다";
  }
};

const getErrorMessage = (apiName, errorCode) => {
  switch (apiName) {
    case "lendings":
      return lendingPostErrorCase(errorCode);
    case "returnings":
      return returningPostErrorCase(errorCode);
    case "reservations":
      return reservationPostErrorCase(errorCode);
    default:
      return "예상치 못한 오류가 발생했습니다";
  }
};

export default getErrorMessage;