import EmphasisInString from "./EmphasisInString";
import "../../css/ModalHeader.css";

type ModalHeaderProps = {
  title?: string;
  isWithCloseButton?: boolean;
  onCloseModal?(...args: unknown[]): unknown;
  emphasis?: string;
  emphasisColor?: string;
};

const ModalHeader = ({
  title,
  isWithCloseButton,
  onCloseModal,
  emphasis,
  emphasisColor,
}: ModalHeaderProps) => {
  return (
    <div className="modal__header">
      {title && (
        <h1 className="modal__header__title">
          <EmphasisInString
            wholeString={title}
            emphasis={emphasis}
            emphasisColorString={emphasisColor}
          />
        </h1>
      )}
      {isWithCloseButton && (
        <button
          type="button"
          className="modal__header__button"
          onClick={onCloseModal}
        >
          닫기
        </button>
      )}
    </div>
  );
};

ModalHeader.defaultProps = {
  title: "",
  isWithCloseButton: true,
  onCloseModal: undefined,
  emphasis: "",
  emphasisColor: "red",
};
export default ModalHeader;
