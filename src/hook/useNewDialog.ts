import { useSetRecoilState } from "recoil";
import { dialogConfigs } from "../atom/dialogConfigs";
import { DialogConfig } from "../type/DialogConfig";
import getErrorMessage from "../constant/error";

export const useNewDialog = () => {
  const setDialogSettings = useSetRecoilState(dialogConfigs);

  const removeDialog = (id: number) => {
    setDialogSettings(prev => prev.filter(dialog => dialog.id !== id));
  };

  const addDialogWithConfig = (
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

  const addDialogWithTitleAndMessage = (
    key: string,
    title: string,
    message: string,
    afterClose?: () => void,
  ) => {
    addDialogWithConfig(key, {
      title,
      message,
      afterClose,
    });
  };

  const addConfirmDialog = (
    key: string,
    title: string,
    message: string,
    onConfirm: () => void,
  ) => {
    addDialogWithConfig(key, {
      title,
      message,
      firstButton: {
        onClick: onConfirm,
      },
    });
  };

  const displayErrorDialog = (
    error: any,
    afterClose?: (errorCode: number) => void,
  ) => {
    const errorCode = error?.response?.data?.errorCode;
    const [title, message] = getErrorMessage(errorCode).split("\r\n");
    addDialogWithTitleAndMessage(
      title,
      title,
      errorCode ? message : message + "\n" + error.message,
      () => {
        if (afterClose && errorCode) afterClose(errorCode);
      },
    );
  };

  return {
    addDialogWithConfig,
    addDialogWithTitleAndMessage,
    addConfirmDialog,
    displayErrorDialog,
  };
};
