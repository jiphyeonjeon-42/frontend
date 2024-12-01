import { callSignAtShelf } from "~/util/bookShelfLocation";

type Props = {
  highlightIndex: number;
};

const BookLocationMap = ({ highlightIndex }: Props) => {
  const shelves = callSignAtShelf;
  return (
    <div className="book-location__map">
      <div className="map-selfservice">무인대출/반납</div>
      <div className="map-sofa-1">소파</div>
      <div className="map-sofa-2">소파</div>
      <div className="map-sofa-3">소파</div>
      <div className="map-entrance">입구</div>
      <div className="map-return">반납서가</div>
      <div className="map-cluster">5클러스터</div>
      {shelves.map((shelf, index) => (
        <div
          key={index}
          className={`map-shelf map-shelf-${index + 1} ${
            highlightIndex === index ? "map-highlight" : ""
          }`}
        >
          {shelf.length > 5 ? "비개발 도서" : shelf.join(" ")}
        </div>
      ))}
    </div>
  );
};

export default BookLocationMap;
