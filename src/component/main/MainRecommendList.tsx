import { Link } from "react-router-dom";
import type { BookInfoRecommend } from "~/type";
import { dateFormat } from "~/util/date";
import Carousel from "~/component/utils/Carousel";
import Image from "~/component/utils/Image";
import Arr from "~/asset/img/arrow_right_gray.svg";
import PaginationCircle from "../utils/PaginationCircle";

type Props = {
  books: BookInfoRecommend[];
};

const MainRecommendList = ({ books }: Props) => {
  return (
    <Carousel.Root length={books.length} itemCount={1}>
      <Carousel.Container className="main__recommend-list__container">
        <Carousel.List
          items={books}
          renderItem={({ item, ...rest }) => (
            <Link
              {...rest}
              to={`/info/${item.id}`}
              className="main__recommend-list__book"
            >
              <Image
                className="main__recommend-list__cover"
                src={item.image}
                alt={item.title}
              />
              <div className="main__recommend-list__detail">
                <p className="main__recommend-list__title">{item.title}</p>
                <p>저자 | {item.author}</p>
                <p>출판사 | {item.publisher}</p>
                <p>발행일 | {dateFormat(item.publishedAt ?? "")}</p>
                <p>관련과제 | {item.project.join(", ")}</p>
              </div>
            </Link>
          )}
        />
      </Carousel.Container>
      <Carousel.Pagination
        render={({ page, setPage, lastPage }) => {
          if (!lastPage) return <></>;
          return (
            <PaginationCircle
              page={page}
              setPage={setPage}
              lastPage={lastPage}
              className="main__recommend-list__pagination"
            />
          );
        }}
      />
      <Carousel.Prev className="main__recommend-list__arrow-button left">
        <Image src={Arr} />
      </Carousel.Prev>
      <Carousel.Next className="main__recommend-list__arrow-button">
        <Image src={Arr} />
      </Carousel.Next>
    </Carousel.Root>
  );
};

export default MainRecommendList;
