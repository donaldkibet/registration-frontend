import { useMemo } from "react";
import useSWR from "swr";
import { SubCounty } from "../types";
import { baseAPIUrl } from "../utils/constant";
import fetcher from "../utils/fetcher";

export const useSubCounties = (countyId: string) => {
  const { data, error } = useSWR<Array<SubCounty>>(
    countyId.length > 0
      ? `${baseAPIUrl}/sub-county?countyID=${countyId}`
      : null,
    fetcher
  );

  const results = useMemo(() => {
    return (
      data?.map((subCounty) => ({
        label: subCounty.name,
        ...subCounty,
      })) ?? []
    );
  }, [data, countyId]);

  return { subCounties: results, error, isLoading: !data && !error };
};
