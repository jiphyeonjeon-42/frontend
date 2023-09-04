import { ComponentProps, useState } from "react";
import { type SearchKeyword } from "~/type/SearchKeyword";
import Carousel from "./Carousel";
import SearchRankingItem from "./SearchRankingItem";

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
          {list.map(item => (
            <SearchRankingItem key={item.id} item={item} height={HEIGHT} />
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
