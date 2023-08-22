import { useEffect, useState } from "react";
import { BookPreviewType } from "~/component/utils/BookSearchPreview";

export const useGetBooksInfoAutoComplete = () => {
  const [books, setBooks] = useState<BookPreviewType[]>([]);

  // TODO: api 개발전으로 mockData로 대체함, 추후 수정예정
  const mockData = [
    {
      id: 1015,
      title: "(세상의 속도를 따라잡고 싶다면 do it!) 자바 프로그래밍 입문",
      author: "박은종",
      publisher: "이지스퍼블리싱",
      image:
        "https://image.kyobobook.co.kr/images/book/xlarge/195/x9791163030195.jpg",
      publishedAt: "2018-08-06T00:00:00.000Z",
    },
    {
      id: 952,
      title: "클라우드 네이티브 자바",
      author: "조쉬 롱, 케니 바스타니",
      publisher: "책만",
      image:
        "https://image.kyobobook.co.kr/images/book/xlarge/733/x9791196203733.jpg",
      publishedAt: "2018-06-28T15:00:00.000Z",
    },
    {
      id: 902,
      title: "자바 최적화",
      author: "벤저민 J. 에번스",
      publisher: "한빛미디어",
      image:
        "https://image.kyobobook.co.kr/images/book/xlarge/776/x9791162241776.jpg",
      publishedAt: "2019-04-28T15:00:00.000Z",
    },
    {
      id: 857,
      title:
        "자바 ORM 표준 JPA 프로그래밍(스프링 데이터 예제 프로젝트로 배우는 전자정부 표준 데이터베이스 프레임워크)",
      author: "김영한",
      publisher: "에이콘출판(주)",
      image:
        "https://image.kyobobook.co.kr/images/book/xlarge/330/x9788960777330.jpg",
      publishedAt: "2015-07-27T15:00:00.000Z",
    },
    {
      id: 602,
      title: "쉽게 배우는 자바 프로그래밍(2판)(IT Cookbook)",
      author: "우종정",
      publisher: "한빛아카데미",
      image:
        "https://image.kyobobook.co.kr/images/book/xlarge/146/x9791156645146.jpg",
      publishedAt: "2020-11-21T15:00:00.000Z",
    },
    {
      id: 720,
      title: "Java의 정석 (최신 Java 8.0 포함) 2권",
      author: "남궁성",
      publisher: "도우출판",
      image:
        "https://image.kyobobook.co.kr/images/book/xlarge/032/x9788994492032.jpg",
      publishedAt: "2016-01-27T00:00:00.000Z",
    },
    {
      id: 683,
      title:
        "열혈강의 자바 웹 개발 워크북 (MVC 아키텍처 마이바티스 스프링으로 만드는 실무형 개발자 로드맵)",
      author: "엄진영",
      publisher: "프리렉",
      image:
        "https://image.kyobobook.co.kr/images/book/xlarge/677/x9788965400677.jpg",
      publishedAt: "2014-05-22T15:00:00.000Z",
    },
    {
      id: 718,
      title: "이펙티브 자바",
      author: "Joshua Bloch",
      publisher: "대웅",
      image:
        "https://image.kyobobook.co.kr/images/book/xlarge/768/x9788986044768.jpg",
      publishedAt: "2009-04-20T15:00:00.000Z",
    },
    {
      id: 35,
      title: "이펙티브 자바 3/E",
      author: "조슈아 블로크",
      publisher: "인사이트",
      image:
        "https://image.kyobobook.co.kr/images/book/xlarge/281/x9788966262281.jpg",
      publishedAt: "2018-10-31T15:00:00.000Z",
    },
    {
      id: 607,
      title: "Head First Java",
      author: "케이시 시에라, 버트 베이츠",
      publisher: "한빛미디어",
      image:
        "http://image.kyobobook.co.kr/images/book/large/713/l9788979143713.jpg",
      publishedAt: "2005-11-20T00:00:00.000Z",
    },
    {
      id: 297,
      title: "윤성우의 열혈 Java 프로그래밍",
      author: "윤성우",
      publisher: "오렌지미디어",
      image:
        "https://image.kyobobook.co.kr/images/book/xlarge/074/x9788996094074.jpg",
      publishedAt: "2017-07-05T00:00:00.000Z",
    },
    {
      id: 684,
      title: "최범균의 JSP 2.3 웹 프로그래밍 기초부터 중급까지",
      author: "최범균",
      publisher: "가메",
      image:
        "https://image.kyobobook.co.kr/images/book/xlarge/802/x9788980782802.jpg",
      publishedAt: "2015-11-16T00:00:00.000Z",
    },
  ];

  useEffect(() => {
    setBooks(mockData);
  }, []);
  return { books };
};
