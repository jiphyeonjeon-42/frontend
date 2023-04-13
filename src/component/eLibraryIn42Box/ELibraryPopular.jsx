import { Link } from "react-router-dom";
import useGetBooksInfoPopular from "../../api/books/useGetBooksInfoPopular";
import ELibraryBook from "./ELibraryBook";
import ELibraryTitleWithMore from "./ELibraryTitleWithMore";

const ELibraryPopular = () => {
  const { docs: bookList } = useGetBooksInfoPopular({
    setOpenTitleAndMessage: () => {},
  });

  return (
    <>
      <ELibraryTitleWithMore title="베스트자료" />
      <div className="elibrary__best">우리베스트</div>
      {/* 모두의 네트워크 부분은 책 설명 부분 때문에 api 호출 불가 */}
      <Link to="/info/536" className="elibrary__best__rank1">
        <span className="elibrary__book__rank">1</span>
        <img
          src="https://image.kyobobook.co.kr/images/book/xlarge/030/x9791160505030.jpg"
          alt="모두의 네트워크"
          className="elibrary__book__image"
        />
        <div className="elibrary__book__detail">
          <p className="elibrary__book__title">모두의 네트워크</p>
          <p className="elibrary__book__author">미즈구치 카츠야</p>
          <p className="elibrary__best__description">
            [모두의 네트워크]는 이제 막 네트워크를 공부하기 시작했거나
            공부해야겠다고 마음먹은 초급자를 대상으로 한 입문서다. 네트워크의
            개념, 비트, 바이트부터 OSI 계층, 무선 랜 구조까지 160개의 일러스트와
            유쾌한 캐릭터들의 대화로 설명해 그림책을 읽듯 쉽고 재미있게 네트워크
            관련 지식을 익힐 수 있다. [모두의 네트워크]로 누구나 쉽게 네트워크를
            익혀 보자!
          </p>
          <div className="elibrary__book__icon">실물책</div>
        </div>
      </Link>
      {/* 인기도서 부분은 실제 집현전 데이터 활용 */}
      <div className="elibrary__book__popular-frame">
        <div className="elibrary__book__popular-books">
          {bookList?.slice(0, 10)?.map((book, index) => (
            <ELibraryBook book={book} rank={index + 2} key={book.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ELibraryPopular;
