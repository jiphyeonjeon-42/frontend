import { useCallback } from "react";
import { useNewDialog } from "./useNewDialog";
import axiosPromise from "../util/axios";

type Method = "get" | "post" | "put" | "patch" | "delete";

export const useApi = (method?: Method, url?: string, data?: unknown) => {
  const { addErrorDialog } = useNewDialog();

  const request = useCallback(
    (resolve: (response: any) => void, reject?: (error: any) => void) => {
      axiosPromise(method ?? "GET", url ?? "/", data)
        ?.then(response => {
          resolve(response);
        })
        ?.catch(error => {
          // 직접 정의한 reject함수가 없으면 기본적인 에러 알림 다이얼로그 호출
          if (reject) reject(error);
          else addErrorDialog(error);
        });
    },
    [method, url, data],
  );

  const requestWithUrl = (
    method: Method,
    url: string,
    options?: {
      data?: unknown;
      onSuccess?: (response: any) => void;
      onError?: (error: any) => void;
    },
  ) => {
    axiosPromise(method, url, options?.data)
      ?.then(response => {
        if (options?.onSuccess) options.onSuccess(response);
      })
      ?.catch(error => {
        if (options?.onError) options.onError(error);
        else addErrorDialog(error);
      });
  };

  return { request, requestWithUrl };
};
