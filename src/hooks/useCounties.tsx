import { useMemo } from "react";
import useSWR from "swr";
import { County } from "../types";
import { baseAPIUrl } from "../utils/constant";
import fetcher from "../utils/fetcher";

export const useCounties = () => {
  const { data, error } = useSWR<Array<County>>(
    `${baseAPIUrl}/county`,
    fetcher
  );

  const results = useMemo(
    () =>
      data?.map((county) => ({
        id: county.id,
        label: county.name,
      })) ?? [],
    [data]
  );
  return { counties: results, error, isLoading: !data && !error };
};
