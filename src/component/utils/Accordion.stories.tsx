import { useState } from "react";
import { Story } from "@ladle/react";
import Accordion, { Props } from "./Accordion";

type AccordionStory = Story<Props>;

const argTypes: AccordionStory["argTypes"] = {
  summaryIconType: {
    options: ["plus", "arrow"],
    control: { type: "inline-radio" },
    defaultValue: "arrow",
  },
  summaryIconPosition: {
    options: ["start", "end"],
    control: { type: "inline-radio" },
    defaultValue: "start",
  },
};

export const 활용법: AccordionStory = ({ ...args }) => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div>
      <h1>Accordion</h1>
      <h2>토글방식의 UI를 위한 컴포넌트</h2>
      <h3>클릭하면 접혀있던/펼쳐져 있던 내용을 확인할 수 있습니다.</h3>
      <Accordion summaryUI="클릭해주세요" detailUI="까꿍" />
      <Accordion
        {...args}
        initialOpened={true}
        summaryUI={<p> 처음부터 열려있도록 설정할 수도 있습니다</p>}
        detailUI={<p>펼쳐있을 때만 보이는 부분</p>}
      />
      <h3>활용방법</h3>
      <Accordion
        {...args}
        summaryUI="ReactNode로 설정되어 있기 때문에 컴포넌트/문자열 등 다양하게 활용할 수 있어요"
        detailUI={
          <p style={{ backgroundColor: "lightgrey", marginTop: "-15px" }}>
            <p>
              느끼셨다시피 기본 스타일링은 없다시피 합니다. 필요에 따라
              className등으로 설정해주세요
            </p>
            <p>
              대표적으로 <a href="https://42library.kr/information">이용안내</a>
              페이지에서 활용하는 컴포넌트입니다
            </p>
          </p>
        }
      />
      <Accordion
        summaryUI="기본적으로 쓰이는 아이콘이 지정되어 있어요"
        detailUI="자세한건 왼쪽 하단 컨트롤로 조정해보세요"
        initialOpened={true}
        summaryIconType="plus"
        summaryIconPosition="end"
      />
      <h3>
        기타 활용 : <b>일괄접기</b>
      </h3>
      <Accordion
        {...args}
        initialOpened={isOpened}
        summaryUI="이 컴포넌트의 접힘 상태에 따라 아래 컴포넌트가 함께 접히거나 펼쳐집니다"
        detailUI="아래 컴포넌트들의 dependencyOpened 설정 때문이예요"
        onChange={() => setIsOpened(!isOpened)}
      />
      <Accordion
        {...args}
        dependencyOpened={isOpened}
        summaryUI="!!"
        detailUI="!!"
      />
      <Accordion
        {...args}
        dependencyOpened={isOpened}
        summaryUI="개별적으로 여닫을 수도 있어요"
        detailUI="!!!"
      />
    </div>
  );
};

활용법.argTypes = argTypes;
