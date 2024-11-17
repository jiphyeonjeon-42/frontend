type Props = {
  highlightIndex: number;
};

const BookLocationMap = ({ highlightIndex }: Props) => {
  const shelves = ["1", "2", "3", "4", "5"];

  return (
    <div className="book-location__map">
      <div className="saseo">사서</div>
      {shelves.map((shelf, index) => (
        <div
          className={`shelf-${index + 1} ${
            highlightIndex === index ? "highlight" : ""
          }`}
        >
          {shelf}
        </div>
      ))}
    </div>
  );
};

export default BookLocationMap;
