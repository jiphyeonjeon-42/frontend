import { useSetRecoilState } from "recoil";
import { dialogConfigs } from "../atom/dialogConfigs";
import { DialogConfig } from "../type/DialogConfig";
import getErrorMessage from "../constant/error";

export const useNewDialog = () => {
  const setDialogSettings = useSetRecoilState(dialogConfigs);
  const removeDialog = (id: number) => {
    setDialogSettings(prev => prev.filter(dialog => dialog.id !== id));
  };

  /** 세부적인 조절이 가능한 기본 함수
   * @param dialogConfig 다이얼로그 설정
   */
  const addDialogWithConfig = (dialogConfig: Omit<DialogConfig, "id">) => {
    const id = Date.now();
    setDialogSettings(prev => [
      ...prev,
      {
        ...dialogConfig,
        afterClose: () => {
          dialogConfig.afterClose?.();
          removeDialog(id);
        },
        id,
      },
    ]);
  };

  /** 간단하게 다이얼로그 호출
   * @param title  제목
   * @param message 내용
   * @param afterClose 다이얼로그가 닫힌 후 실행할 함수
   */
  const addDialogWithTitleAndMessage = (
    title: string,
    message: string,
    afterClose?: () => void,
  ) => {
    addDialogWithConfig({
      title,
      message,
      afterClose,
    });
  };

  /** 확인 요청용 다이얼로그 호출
   * @param title  제목
   * @param message 내용
   * @param onConfirm 확인 버튼을 클릭했을 때만 실행할 함수, 취소 버튼 등 다른 버튼으로 닫히면 실행되지 않음
   */
  const addConfirmDialog = (
    title: string,
    message: string,
    onConfirm: () => void,
  ) => {
    addDialogWithConfig({
      title,
      message,
      firstButton: {
        onClick: onConfirm,
      },
    });
  };

  /** 에러 상황 알림용 다이얼로그 호출
   * @param error 에러 정보를 담은 객체
   * @param afterClose 다이얼로그가 닫힌 후 실행할 함수 (optional)
   */
  const addErrorDialog = (
    error: any,
    afterClose?: (errorCode: number) => void,
  ) => {
    const errorCode = error?.response?.data?.errorCode;
    const [title, message] = getErrorMessage(errorCode).split("\r\n");
    addDialogWithTitleAndMessage(
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
    addErrorDialog,
  };
};
