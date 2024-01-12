import type { contract } from "@jiphyeonjeon-42/contracts";
import type { ClientInferRequest } from "@ts-rest/core";
import { useState } from "react";
import { client } from "~/util/tsRestClient";

type QueryArgs = ClientInferRequest<typeof contract.reviews.get>["query"];

export const useGetReviews = () => {
  const [search, setSearch] = useState<string | undefined>();
  const [page, setPage] = useState(1);
  const [visibility, setVisibility] = useState<"public" | "hidden" | "all">(
    "all",
  );

  const queryArgs: QueryArgs = {
    search,
    page,
    visibility,
    perPage: 10,
    sort: "desc",
  };

  const query = client.reviews.get.useQuery(
    ["reviews", queryArgs],
    { query: queryArgs },
    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 60,
    },
  );

  return {
    page,
    setPage,
    setSearch,
    visibility,
    setVisibility,
    data: query.data?.body,
  };
};
