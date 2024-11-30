import BookInformationWithCover from "../utils/BookInformationWithCover";
import TextWithLabel from "../utils/TextWithLabel";
import TextareaWithLabel from "../utils/TextareaWithLabel";
import Button from "../utils/Button";
import "../../asset/css/ReturnModalContents.css";
import { usePatchLendingsReturn } from "../../api/lendings/usePatchLendingsReturn";
import { useGetLendingsId } from "../../api/lendings/useGetLendingsId";
import { useRef, useCallback, useState } from "react";

type Props = {
  lendingId: number;
  closeModal: () => void;
};

const ReturnModalContents = ({ lendingId, closeModal }: Props) => {
  const { lendingData } = useGetLendingsId({ lendingId, closeModal });
  const [isReturnable, setIsReturnable] = useState(false);
  const conditionRef = useRef<string>('');

  const { condition, setCondition, requestReturn } = usePatchLendingsReturn({
    lendingId,
    title: lendingData?.title || "",
    closeModal,
  });

  const setConditionRef = useCallback((value: string) => {
      conditionRef.current = value;
      setCondition(value);
      setIsReturnable(conditionRef.current.length > 0);
    },
    [],
  );

  if (!lendingData) return null;

  return (
    <BookInformationWithCover
      wrapperClassName="return-modal__wrapper"
      bookCoverImg={lendingData.image}
      bookCoverAlt={lendingData.title}
    >
      <TextWithLabel
        wrapperClassName="return-modal__book"
        topLabelText="도서정보"
        mainText={lendingData.title}
        bottomLabelText={`청구기호 : ${lendingData.callSign}`}
      />
      <TextWithLabel
        wrapperClassName="return-modal__lend"
        topLabelText="대출정보"
        mainText={lendingData.createdAt.replaceAll(".", "-")}
        bottomLabelText={`반납예정일 : ${lendingData.dueDate.replaceAll(
          ".",
          "-",
        )}`}
      />
      <TextWithLabel
        topLabelText="유저정보"
        mainText={lendingData.login || ""}
        bottomLabelText={`연체일수 : ${lendingData.penaltyDays}일`}
      />
      <TextareaWithLabel
        wrapperClassName="return-modal__remark"
        topLabelText="비고"
        setTextareaValue={setConditionRef}
        textareaPlaceHolder={`대출당시 : ${lendingData.lendingCondition}`}
        isVisibleBottomMessage={!conditionRef.current.length}
        bottomMessageText="비고를 입력해주세요"
        bottomMessageColor="red"
      />
      <div className="return-modal__buttons">
        <Button
          value="반납 완료하기"
          color={conditionRef.current.length ? "red" : undefined}
          disabled={!conditionRef.current.length}
          onClick={requestReturn}
        />
        <Button
          value="취소하기"
          className="return-modal__cancel"
          onClick={closeModal}
        />
      </div>
    </BookInformationWithCover>
  );
};

export default ReturnModalContents;
