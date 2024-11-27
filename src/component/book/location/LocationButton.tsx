type Props = {
  isBookLocationVisible: boolean;
  onToggleVisibility: () => void;
};
const LocationButton = ({
  isBookLocationVisible,
  onToggleVisibility,
}: Props) => {
  return (
    <div>
      <button
        className="location_button"
        type="button"
        onClick={onToggleVisibility}
      >
        {isBookLocationVisible ? "표지 보기" : "도서 위치"}
      </button>
    </div>
  );
};

export default LocationButton;
