import { useSetRecoilState } from "recoil";
import { dialogConfigs } from "../atom/dialogConfigs";
import { DialogConfig } from "../type/DialogConfig";

export const useNewDialog = () => {
  const setDialogSettings = useSetRecoilState(dialogConfigs);

  const removeDialog = (id: number) => {
    setDialogSettings(prev => prev.filter(dialog => dialog.id !== id));
  };

  const addDialog = (
    key: string,
    dialogConfig: Omit<DialogConfig, "id" | "key">,
  ) => {
    const id = Date.now();
    setDialogSettings(prev => [
      ...prev,
      {
        ...dialogConfig,
        afterClose: () => {
          dialogConfig.afterClose?.();
          removeDialog(id);
        },
        key,
        id,
      },
    ]);
  };

  return { addDialog };
};
