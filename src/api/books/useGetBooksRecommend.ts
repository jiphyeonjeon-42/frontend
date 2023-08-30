import { useEffect, useState } from "react";
import { BookInfoRecommend } from "~/type";

export const useGetBooksRecommend = () => {
  const [books, setBooks] = useState<BookInfoRecommend[]>([]);
  const [options, setOptions] = useState<string[]>([]);

  const mockData = {
    items: [
      {
        id: 1013,
        title: "시작하세요! 도커/쿠버네티스",
        author: "용찬호",
        publisher: "위키북스",
        image:
          "https://image.kyobobook.co.kr/images/book/xlarge/829/x9791158391829.jpg",
        publishedAt: "2020-01-02T00:00:00.000Z",
        subject: ["inception"],
      },
      {
        id: 1012,
        title: "Effective Modern C++",
        author: "스콧 마이어스",
        publisher: "인사이트",
        image:
          "https://image.kyobobook.co.kr/images/book/xlarge/642/x9788966261642.jpg",
        publishedAt: "2015-09-18T00:00:00.000Z",
        subject: ["ft_containers", "cpp"],
      },
      {
        id: 1023,
        title: "칼리 리눅스 입문자를 위한 메타스플로잇 중심의 모의 침투 3/e",
        author: "오동진",
        publisher: "에이콘",
        image:
          "https://image.kyobobook.co.kr/images/book/xlarge/877/x9791161752877.jpg",
        publishedAt: "2019-03-29T00:00:00.000Z",
        subject: ["born2beroot", "ft_server"],
      },
      {
        id: 1022,
        title: "깐깐하게 배우는 C",
        author: "제드 쇼",
        publisher: "인사이트",
        image:
          "https://image.kyobobook.co.kr/images/book/xlarge/151/x9788966262151.jpg",
        publishedAt: "2018-02-05T00:00:00.000Z",
        subject: ["libft", "printf"],
      },
      {
        id: 1021,
        title: "오늘부터 작심만일",
        author: "나건일",
        publisher: "비즈니스북스",
        image:
          "https://image.kyobobook.co.kr/images/book/xlarge/207/x9791162543207.jpg",
        publishedAt: "2023-01-13T00:00:00.000Z",
        subject: ["minishell", "webserv"],
      },
      {
        id: 1020,
        title: "(화이트 해커를 위한) 웹 해킹의 기술",
        author: "최봉환",
        publisher: "BJ Public(비제이퍼블릭)",
        image:
          "https://image.kyobobook.co.kr/images/book/xlarge/634/x9791186697634.jpg",
        publishedAt: "2018-06-29T00:00:00.000Z",
        subject: ["ft_transcendence"],
      },
    ],
    meta: ["0서클 | libft", "1서클 | printf", "outer | ft_ping"],
  };

  useEffect(() => {
    const { items, meta } = mockData;
    setBooks(items);
    setOptions(meta);
  }, []);

  return { books, options, setOptions };
};
