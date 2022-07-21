const getErrorMessage = errorCode => {
  switch (errorCode) {
    // 사서 및 사용자
    case 0:
      return `알 수 없는 오류가 발생했습니다.`;
    case 1:
      return `SQL 에러가 발생했습니다.`;
    case 2:
      return `잘못된 요청이 들어왔습니다.`;

    // 사용자
    case 100:
      return `권한이 없습니다.`;
    case 101:
      return `연결된 계정이 없습니다.\r\n회원가입 후 마이페이지에서 연결해주세요.`;
    case 102:
      return `로그인 후 이용할 수 있는 기능입니다.`;
    case 103:
      return `이메일과 비밀번호를 모두 입력해주세요.`;
    case 104:
      return `비밀번호가 일치하지 않습니다.\r\n로그인에 실패하였습니다.`;
    case 105:
      return `이미 인증된 회원입니다.`;
    case 107:
      return `존재하지 않는 이메일입니다.`;
    case 108:
      return `토큰이 만료되었습니다.\r\n다시 로그인해주세요.`;
    case 109:
      return `토큰이 유효하지 않습니다.\r\n다시 로그인해주세요.`;
    case 110: // 추후 1번 에러코드와 합칠 예정
      return `SQL 에러가 발생했습니다.`;
    case 111:
      return `이전에 연결된 계정이 있습니다.\r\n로그인 페이지에서 42 Intra 로그인을 해주세요.`;
    case 112:
      return `42 API 접근을 거부하였습니다.`;

    // 사서
    case 203:
      return `이미 존재하는 이메일입니다.\r\n사서에게 문의해주세요.`;
    case 204:
      return `이미 존재하는 닉네임입니다.`;
    case 205: // 사용자
      return `비밀번호 형식이 잘못되었습니다.`;
    case 206:
      return `역할은 0~3 사이의 값만 가능합니다.`;
    case 207:
      return `이미 존재하는 슬랙 ID 입니다.`;
    case 208:
      return `42 인증 완료`;

    // 사서
    case 302:
      return `ISBN 검색 결과가 없습니다.`;
    case 303:
      return `ISBN 검색을 실패했습니다.`;
    case 304: // 사용자
      return `존재하지 않는 도서입니다.\r\n조회가 불가능합니다.`;
    case 305:
      return `이미 존재하는 청구기호입니다.`;

    // 사서
    case 401:
      return `존재하지 않는 사용자입니다.`;
    case 402:
      return `대출 권한이 없는 사용자입니다.\r\n42 인증 후 대출이 가능합니다.`;
    case 403:
      return `현재 2권 이상 대출중입니다.`;
    case 404:
      return `현재 연체 패널티 기간인 사용자입니다.`;
    case 405:
      return `이미 대출 중인 도서입니다.`;
    case 406:
      return `예약자가 있어 대출이 불가능합니다.`;
    case 407:
      return `분실된 책입니다.\r\n대출이 불가능합니다.`;
    case 408:
      return `파손된 책입니다.\r\n대출이 불가능합니다.`;
    case 410:
      return `존재하지 않는 대출입니다.`;
    case 411:
      return `이미 반납 처리된 건입니다.`;

    // 사용자
    case 501:
      return `존재하지 않는 도서입니다.\r\n예약이 불가능합니다.`;
    case 502:
      return `연체 패널티로 인해 예약이 불가합니다.`;
    case 503:
      return `비치 중인 책은 예약하실 수 없습니다`;
    case 504:
      return `이미 예약하신 책입니다.`;
    case 505:
      return `본인이 대출중인 책은 예약이 불가능합니다.`;
    case 506:
      return `예약은 최대 2권까지만 가능합니다.`;
    case 507:
      return `타인의 예약을 취소할 수 없습니다.`;
    case 508:
      return `존재하지 않는 예약입니다.`;
    case 509:
      return `이미 만료된 예약입니다.`;

    // 알 수 없는 오류
    default:
      return `예상치 못한 오류가 발생했습니다.\r\n오류 확인 및 수정을 위해 slack 으로 문의 부탁드립니다!`;
  }
};

export default getErrorMessage;
