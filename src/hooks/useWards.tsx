import { useMemo } from "react";
import useSWR from "swr";
import { Ward } from "../types";
import { baseAPIUrl } from "../utils/constant";
import fetcher from "../utils/fetcher";

export const useWardsByCountyAndSubCountyID = (
  countyID: string,
  subCountyID: string
) => {
  const { data, error } = useSWR<Array<Ward>>(
    countyID.length > 0 && subCountyID.length > 0
      ? `${baseAPIUrl}/ward?countyID=${countyID}&subCountyID=${subCountyID}`
      : null,
    fetcher
  );

  const results = useMemo(() => {
    return data?.map((ward) => ({ ...ward, label: ward.name })) ?? [];
  }, [data, subCountyID, countyID]);

  return { wards: results, error, isLoading: !data && !error };
};
