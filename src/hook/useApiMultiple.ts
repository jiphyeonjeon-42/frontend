import { useCallback } from "react";
import axiosPromise from "../util/axios";

type Method = "get" | "post" | "put" | "patch" | "delete";

export const useApiMultiple = (
  apiArray: { method: Method; url: string; data?: unknown }[],
) => {
  const axiosArray = () =>
    apiArray.map(api => axiosPromise(api.method, api.url, api.data));

  /* All or Nothing, 하나라도 실패하면 전부 취소 */
  const requestTransaction = useCallback(
    (handleResults: (results: any[]) => void) => {
      Promise.all(axiosArray())?.then(results => {
        handleResults(results);
      });
    },
    [apiArray],
  );

  /* 독립적인 개별 시도가 모두 끝날때까지 대기 
     각 결과는 status 값 "fulfilled" or "rejected" */
  const requestIndividual = useCallback(
    (handleResults: (results: PromiseSettledResult<any>[]) => void) => {
      Promise.allSettled(axiosArray())?.then(results => {
        handleResults(results);
      });
    },
    [apiArray],
  );

  return { requestTransaction, requestIndividual };
};
