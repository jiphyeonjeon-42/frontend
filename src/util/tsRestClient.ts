import { initQueryClient } from "@ts-rest/react-query";
import { contract } from "@jiphyeonjeon-42/contracts";

/**
 * {@link https://tanstack.com/query/latest/docs/react/overview | @tanstack/react-query }의 쿼리들을
 * {@link https://ts-rest.com/docs/react-query | ts-rest}로 타입 안전하게 감싼 객체입니다.
 *
 * API 요청 경로를 지정한 후
 * react-query 라이브러리의 {@link https://tanstack.com/query/latest/docs/react/guides/queries | useQuery }및
 * {@link https://tanstack.com/query/latest/docs/react/guides/mutations | useMutation }과 동일하게 사용 가능합니다.
 *
 * @example
 * ```ts
 * const mutation = client.reviews.patch.useMutation({
 *   onSuccess: ({ body }) => // ...
 *
 *   onError: error => {
 *       switch (error.status) {
 *         case 401:
 *           return console.log(`에러코드: ${error.body.errorCode}`)
 *         case 404:
 *           return console.log(error.body.message)
 *           // message의 타입: "검색한 리뷰가 존재하지 않습니다."
 *       }
 *   },
 * })
 * ```
 *
 * @remarks 아래 링크를 참고하여 쿼리를 사용할 수 있습니다.
 *
 * @see https://tanstack.com/query/latest/docs/react/overview
 * @see https://ts-rest.com/docs/react-query
 */
export const client = initQueryClient(contract, {
  baseUrl: new URL(import.meta.env.REACT_APP_API).origin,
  baseHeaders: {},
  credentials: "include",
  jsonQuery: true,
});
