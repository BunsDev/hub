import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useSWR from "swr";

import { useDebounce, useStateValue } from "hooks";
import { domain } from "src/constants";

const useFindApis = (
  defaultSearchValue = "",
  delay = 500
): [string, Dispatch<SetStateAction<string>>] => {
  const [searchValue, setSearchValue] = useState(defaultSearchValue);
  const [_, dispatch] = useStateValue();
  const debouncedSearchValue = useDebounce(searchValue, delay);

  const { data: searchResult } = useSWR(
    domain +
      (debouncedSearchValue
        ? `/api/apis/find/${debouncedSearchValue}`
        : `/api/apis/active`)
  );
  useEffect(() => {
    const apis = searchResult?.apis || [];
    dispatch({ type: "SET_AVAILABLE_APIS", payload: apis });
  }, [searchResult]);

  return [searchValue, setSearchValue];
};

export default useFindApis;
