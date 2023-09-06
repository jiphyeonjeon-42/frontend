import { ComponentProps, useEffect, useState } from "react";
import { type SearchKeyword } from "~/type/SearchKeyword";
import Carousel from "./Carousel";
import SearchRankingItem from "./SearchRankingItem";
import ToggleDownArrow from "~/asset/img/caret-down_DaveGandy.png";
import Image from "./Image";
import { Link } from "react-router-dom";

type Props = ComponentProps<"div"> & {
  list: (SearchKeyword & { id: number })[];
};

const SearchRankingList = ({ list }: Props) => {
  const [isOpened, setIsOpened] = useState(false);
  const HEIGHT = 24;

  const toggleOpened = () => setIsOpened(!isOpened);

  return (
    <button
      type="button"
      onClick={toggleOpened}
      className="search-ranking__wrapper"
      style={{ height: HEIGHT }}
    >
      {isOpened ? (
        <div className="search-ranking__container">
          <p
            className="search-ranking__keyword__wrapper title"
            style={{ height: HEIGHT }}
          >
            인기검색어
            <Image src={ToggleDownArrow} alt="인기검색어 닫기" />
          </p>
          {list.map(item => (
            <Link
              to={`search?search=${encodeURIComponent(item.searchKeyword)}`}
            >
              <SearchRankingItem key={item.id} item={item} height={HEIGHT} />
            </Link>
          ))}
        </div>
      ) : (
        <Carousel.Root
          direction="column"
          length={list.length}
          itemSize={HEIGHT}
        >
          <Carousel.Container className="search-ranking__container">
            <Carousel.List
              items={list}
              showPreviousItem="none"
              renderItem={({ item }) => (
                <SearchRankingItem item={item} key={item.key} height={HEIGHT} />
              )}
            ></Carousel.List>
          </Carousel.Container>
        </Carousel.Root>
      )}
    </button>
  );
};

export default SearchRankingList;
