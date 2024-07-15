import { Story } from "@ladle/react";
import Carousel from "./Carousel";
import { Props } from "./CarouselRoot";

type CarouselStory = Story<Props>;

const exampleArray = Array.from({ length: 10 }, (_, i) => ({ id: i + 1 }));
const exampleItemSize = 100;
// 리스트 내부에 들어갈 UI 컴포넌트 예시
const ExampleItemUi = ({ item }: { item: { id: number } }) => (
  <div
    style={{
      width: "100px",
      height: "100px",
      border: "solid 2px red",
      flexBasis: exampleItemSize,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    {item.id}
  </div>
);

export const 기본활용법: CarouselStory = () => (
  <>
    <h1>Carousel</h1>
    <h2>무한 회전하는 UI 컴포넌트</h2>
    <h3>기본으로 애니메이션이 적용된 리스트</h3>
    <p>- 무한회전을 위한 설정 자동으로 적용됨 (마지막요소 다음에 첫요소 등)</p>
    <p>- 마우스 hover시 일시 정지 및 재시작 기능 포함</p>
    <p>- 메인페이지 인기도서, 인기검색어 등에 활용되고 있음</p>
    <Carousel.Root length={exampleArray.length} itemSize={exampleItemSize}>
      <Carousel.List items={exampleArray} renderItem={ExampleItemUi} />
    </Carousel.Root>
  </>
);

export const 조합활용: CarouselStory = () => (
  <>
    <h1>Carousel</h1>
    <h2>다양한 컴포넌트를 조합하여 활용</h2>
    <h3>컴포넌트를 조합하여 다양한 UI를 구성할 수 있음</h3>
    <p>필수 컴포넌트인 Root와 List외의 컴포넌트는 필요에 따라 추가할 수 있음</p>
    <p>Root로 감싸있기만 하면 컴포넌트의 위치 및 순서, 조합은 자유롭게 선택 </p>
    <p>
      cf.
      <a href="https://www.google.com/search?q=Compound+Pattern">
        Compound Pattern
      </a>
    </p>

    <Carousel.Root length={exampleArray.length} itemSize={exampleItemSize}>
      <Carousel.Container>
        <Carousel.Prev>
          <button>이전</button>
        </Carousel.Prev>
        <Carousel.List items={exampleArray} renderItem={ExampleItemUi} />
        <Carousel.Prev>
          <button>이전</button>
        </Carousel.Prev>
      </Carousel.Container>
      <Carousel.Next>
        <button>다음</button>
      </Carousel.Next>
    </Carousel.Root>
  </>
);
export const 컴포넌트상세: CarouselStory = () => (
  <>
    <h1>Carousel.Root</h1>
    <p>필수 컴포넌트, 전체를 감싸는 context 제공</p>

    <h1>Carousel.List</h1>
    <p>필수 컴포넌트, 리스트와 각 요소 UI 표현</p>

    <h1>Carousel.Container</h1>
    <p>리스트를 감싸는 컴포넌트 (생략가능)</p>
    <p>특정 영역만 보이도록 설정하기 위함</p>
    <Carousel.Root length={exampleArray.length} itemSize={exampleItemSize}>
      <Carousel.Container style={{ width: "250px" }}>
        <Carousel.List items={exampleArray} renderItem={ExampleItemUi} />
      </Carousel.Container>
    </Carousel.Root>

    <h1>Carousel.Prev & Carousel.Next</h1>
    <p>리스트 이전/다음 요소로 넘기기 위한 버튼 컴포넌트 (생략가능)</p>
    <Carousel.Root length={exampleArray.length} itemSize={exampleItemSize}>
      <Carousel.Next>다음</Carousel.Next>
      <Carousel.List items={exampleArray} renderItem={ExampleItemUi} />
      <Carousel.Prev>
        <p>이전</p>
        <span style={{ backgroundColor: "lightgreen" }}>
          이 안에 다양한 UI를 넣어 꾸밀 수 있어요
        </span>
      </Carousel.Prev>
    </Carousel.Root>

    <h1>Carousel.Pagination</h1>
    <p>리스트 페이지네이션 용 컴포넌트 (생략가능)</p>
    <p>
      리스트의 현재 위치를 나타내거나 특정 위치로 이동하도록 설정가능 (생략가능)
    </p>
    <p>Root에 저장된 page, setPage, lastPage를 Props로 받아 UI를 구성</p>
    <p>- page : 현재 리스트의 위치</p>
    <p>- setPage : 특정 위치로 이동시키는 함수</p>
    <Carousel.Root length={exampleArray.length} itemSize={exampleItemSize}>
      <Carousel.List items={exampleArray} renderItem={ExampleItemUi} />
      <Carousel.Pagination
        render={({ page, setPage }) => (
          <>
            {exampleArray.map(item => {
              const isCurrentPage = item.id === page;
              return (
                <button
                  key={item.id}
                  onClick={() => setPage(item.id)}
                  style={{ color: isCurrentPage ? "red" : "black" }}
                >
                  {item.id}
                </button>
              );
            })}
          </>
        )}
      />
    </Carousel.Root>
  </>
);
