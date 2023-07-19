import { useState, useRef } from "react";
import Question from "./Question";
import Image from "../utils/Image";
import Banner from "../utils/Banner";
import ScrollTopButton from "../utils/ScrollTopButton";
import Toggle from "../../asset/img/caret-right.svg";
import "../../asset/css/Information.css";

const Information = () => {
  const [allOpen, setAllOpen] = useState(false);
  const mounted = useRef(true);
  const onClickAllOpen = () => {
    setAllOpen(prev => !prev);
    mounted.current = false;
  };

  return (
    <main>
      <Banner img="information" titleKo="이용안내" titleEn="INFORMATION" />
      <div className="information-wrapper">
        <section className="information-section">
          <ScrollTopButton rightRem={-10} bottomRem={5} />
          <div className="information-subtitle">
            <div className="information-subtitle__line" />
            <div className="information-subtitle__titlebox">
              <div className="information-subtitle__titlebox__title">
                무엇이 궁금하신가요?
              </div>
              <button
                className="information-subtitle__titlebox__toggle"
                type="button"
                onClick={onClickAllOpen}
              >
                {!allOpen ? "전체열기" : "전체닫기"}
                <Image
                  src={Toggle}
                  className={`toggle_img ${
                    !allOpen ? `rotate-right` : `rotate-left`
                  }`}
                  alt="toggle"
                />
              </button>
            </div>
          </div>
          <div className="information-qna">
            <Question
              isOpen={mounted.current || allOpen}
              question="이용 가능 시간은 어떻게 되나요?"
              answer="열람은 개포 클러스터가 오픈되어 있다면 언제나 가능하지만, 대출 및 반납은 사서가 있는 시간(평일 13~18시)에만 가능하니 유의해 주세요! 자세한 이용문의는 집현전 공식 채널 #42seoul_club_42jiphyeonjeon 에 질문을 남겨주시면 안내해드리겠습니다."
              linkText="#42seoul_club_42jiphyeonjeon"
              link="https://42born2code.slack.com/archives/C0174FTH8N6"
            />
            <Question
              isOpen={allOpen}
              question="집현전이 어디죠?"
              answer="개포 클러스터 1층 왼쪽 복도 가장 안쪽에 있습니다."
            />
            <Question
              isOpen={allOpen}
              question="한 번에 몇 권까지 대출할 수 있을까요? 그리고 대출 기간은 얼마나 되나요?"
              answer="대출은 1인당 최대 2권씩 가능하며, 대출 기간은 2주입니다. 예를 들어 월요일에 대출하셨다면, 2주 뒤 월요일까지 반납해 주시길 바랍니다."
            />
            <Question
              isOpen={allOpen}
              question="책을 더 오래 빌리고 싶은데, 연장도 가능할까요?"
              answer="온라인에서 연장은 불가하지만, 예약자가 없으면 오프라인에서 반납 후 재대출하실 수 있습니다."
            />
            <Question
              isOpen={allOpen}
              question="만약 연체를 하게 된다면 어떤 페널티를 받게 되나요?"
              answer="연체한 도서를 반납한 당일부터 연체한 기간만큼 대출이 제한됩니다."
            />
            <Question
              isOpen={allOpen}
              question="클러스터 가기 어려운 카뎃을 위해 대신 대출/반납 가능할까요?"
              answer="대리 반납은 가능하지만 대리 대출은 불가능합니다."
            />
            <Question
              isOpen={allOpen}
              question="예약을 했는데 언제 대출할 수 있을까요?"
              answer="예약한 도서가 반납되면 다음 예약자에게 대출 우선권이 부여됩니다. 대출이 가능해지면 집현전 슬랙봇이 알려드립니다!"
            />
            <Question
              isOpen={allOpen}
              question="예약한 책이 반납되었다는 슬랙 알림을 받았습니다. 오늘 당장 대출해야하나요?"
              answer="예약 유효기간은 알림 받은 당일을 제외하고 2 영업일입니다. 슬랙으로 안내해드린 날짜 안에만 대출하시면 됩니다. 만약 이 기한을 넘기면 예약은 자동으로 취소되니 유의해주세요!"
            />
            <Question
              isOpen={allOpen}
              question="실수로 다른 책을 예약했어요! 예약을 취소할 수 있을까요?"
              answer="마이페이지에서 예약 취소 가능합니다."
              linkText="마이페이지"
              link="./mypage"
            />
            <Question
              isOpen={allOpen}
              question="무인 대출 / 무인 반납 가능한가요?"
              answer="무인 시스템 도입은 여러 가지 고려할 사항들이 많아 당장 시도하기 어려운 상황입니다. 분실 및 파손 대책 등 무인 시스템을 위한 좋은 의견이 있다면 언제든 공유해주세요! 집현전 공식채널 #42seoul_club_42jiphyeonjeon 은 항상 열려있습니다!"
              linkText="#42seoul_club_42jiphyeonjeon"
              link="https://42born2code.slack.com/archives/C0174FTH8N6"
            />
            <Question
              isOpen={allOpen}
              question="도서 기부는 어떻게 하나요?"
              answer="평일 (13시~18시)에 집현전 사서가 도서 기부를 도와드리겠습니다. 도서의 주제나 상태가 적절치 않은 경우 도서 기부가 어려울 수 있습니다."
            />
            <Question
              isOpen={allOpen}
              question="보고 싶은 책이 있는데 집현전에 없어요. 도서 신청을 할 수 있을까요?"
              answer="희망도서 신청폼에서 신청해주세요."
              linkText="희망도서 신청폼"
              link={import.meta.env.REACT_APP_WISH}
            />
            <Question
              isOpen={allOpen}
              question="사이트에 다른 기능도 추가해주실 수 있나요?"
              answer="건의사항 시트에 의견을 남겨주세요! 더 개선해나가는 집현전 웹서비스 개발팀이 되겠습니다."
              linkText="건의사항 시트"
              link={import.meta.env.REACT_APP_SUGGESTION}
            />
          </div>
        </section>
      </div>
    </main>
  );
};

export default Information;
