import React from "react";
import Title from "./Title";
import SubTitle from "./SubTitle";
import Question from "./Question";
import "../css/Infomation.css";

const Infomation = () => {
  return (
    <main>
      <section className="infomation-bg">
        <div className="infomation-title">
          <Title titleKorean="이용안내" titleEng="INFORMATION" />
        </div>
      </section>
      <div className="infomation-subtitle">
        <SubTitle subTitle="무엇이 궁금하신가요?" alignItems="start" />
      </div>
      <Question
        isOpen={1}
        question="이용 가능 시간은 어떻게 되나요?"
        answer="열람은 주말, 공휴일 포함 24시간 이용가능합니다. 하지만 대출반납은 사서가 있는 시간에만 가능합니다.
자세한 이용문의는 02-000-0000으로 연락주시면 안내해드리겠습니다."
      />
      <Question
        isOpen={0}
        question="대출은 몇권까지 가능한가요?"
        answer="최대 2권 가능합니다."
      />
    </main>
  );
};

export default Infomation;
