import { useEffect, useState } from "react";
import { useApi } from "../../hook/useApi";
import { compareExpect } from "../../util/typeCheck";
import { Lending } from "../../type";
import { useNewDialog } from "../../hook/useNewDialog";

type Props = {
  lendingId: number;
  closeModal: () => void;
};

export const useGetLendingsId = ({ lendingId, closeModal }: Props) => {
  const [lendingData, setLendingData] = useState<Lending>();

  const { request } = useApi("get", `lendings/${lendingId}`, {});

  const expectedItem = [
    { key: "id", type: "number", isNullable: false },
    { key: "title", type: "string", isNullable: false },
    { key: "callSign", type: "string", isNullable: false },
    { key: "dueDate", type: "string", isNullable: false },
    { key: "createdAt", type: "string", isNullable: false },
    { key: "lendingCondition", type: "string", isNullable: false },
    { key: "login", type: "string", isNullable: true },
    { key: "penaltyDays", type: "number", isNullable: false },
    { key: "image", type: "string", isNullable: true },
  ];

  const refineResponse = (response: any) => {
    const [lending] = compareExpect(
      "lendings/id",
      [response.data],
      expectedItem,
    );
    setLendingData(lending);
  };

  const { addErrorDialog } = useNewDialog();
  const displayError = (error: any) => {
    addErrorDialog(error, closeModal);
  };

  useEffect(() => {
    request(refineResponse, displayError);
  }, [lendingId]);

  return { lendingData };
};
