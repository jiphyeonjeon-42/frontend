import { Story } from "@ladle/react";
import Tooltip, { Props } from "./Tooltip";

type TooltipStory = Story<Props>;

export const 활용법: TooltipStory = () => (
  <>
    {/* 툴팁 컴포넌트 활용에 필요, App.tsx에 내장되어 있음 */}
    <div id="portal" />
    <h1>Tooltip</h1>
    <h2>UI의 간단한 설명을 추가하기 위한 컴포넌트</h2>
    <h3>마우스 hover시 설명을 확인할 수 있습니다.</h3>
    <Tooltip description="툴팁의 설명입니다">
      <span>툴팁이 나올 요소입니다</span>
    </Tooltip>
    <div
      style={{
        display: "flex",
        justifyContent: "end",
      }}
    >
      <Tooltip description="↑ 툴팁 시작위치">
        하위요소 위치에 바로 아래에 툴팁이 나옵니다
      </Tooltip>
    </div>
  </>
);
