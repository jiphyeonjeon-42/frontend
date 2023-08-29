import type { BookInfo } from "~/type";
import { useResponsiveWidth } from "~/hook/useResponsiveWidth";
import Carousel from "~/component/utils/Carousel";
import Image from "~/component/utils/Image";
import MainNewBook from "~/component/main/MainNewBook";
import MainNewBookPagination from "~/component/main/MainNewBookPagination";
import ArrLeft from "~/asset/img/arrow_left.svg";
import ArrRight from "~/asset/img/arrow_right.svg";

type Props = {
  docs: BookInfo[];
};

const MainNewBookList = ({ docs }: Props) => {
  const { width: bookWidth } = useResponsiveWidth({
    pcWidth: 200,
    mobileWidth: 100,
  });

  const margin = bookWidth * 0.1;
  const moveButton = {
    width: bookWidth / 4,
    height: bookWidth * 1.5 + 20,
  };

  return (
    <Carousel.Root
      className="main-new__container"
      length={docs.length}
      itemSize={bookWidth + margin}
      delay={2000}
    >
      <Carousel.Prev className="main-new__arrow">
        <Image
          src={ArrLeft}
          alt="이전"
          width={moveButton.width}
          height={moveButton.height}
        />
      </Carousel.Prev>
      <Carousel.Next className="main-new__arrow right">
        <Image
          src={ArrRight}
          alt="다음"
          width={moveButton.width}
          height={moveButton.height}
        />
      </Carousel.Next>
      <Carousel.List
        className="main-new__booklist"
        showPreviousItem="half"
        items={docs}
        renderItem={({ item }) => (
          <MainNewBook book={item} key={item.key} bookWidth={bookWidth} />
        )}
      />
      <Carousel.Pagination
        className="main-new__pagination"
        render={({ page, setPage }) => (
          <MainNewBookPagination page={page} setPage={setPage} />
        )}
      />
    </Carousel.Root>
  );
};

export default MainNewBookList;
