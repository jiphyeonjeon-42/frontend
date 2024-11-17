type Props = {
  viewLocation: () => void;
};
const LocationButton = ({ viewLocation }: Props) => {
  return (
    <div className="location_button_box">
      <button className="location_button" type="button" onClick={viewLocation}>
        도서 위치
      </button>
    </div>
  );
};

export default LocationButton;
