import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import useSWR from "swr";

import { useDebounce, useStateValue } from "hooks";
import { domain } from "src/constants";
import useRouter from "./useRouter";
import axios from "axios";

const useFindApis = (
  defaultSearchValue = "",
  delay = 500
): [string, Dispatch<SetStateAction<string>>] => {
  const [searchValue, setSearchValue] = useState(defaultSearchValue);
  const [{ dapp }, dispatch] = useStateValue();
  const [debouncedSearchValue, prevSearchValue] = useDebounce(
    searchValue,
    delay
  );
  const [preload, setPreload] = useState(true);
  const router = useRouter();
  const searchParams = useRef<string>();

  const currSearchVal = useRef<string>();

  useEffect(() => {
    if (router.isReady) {
      if (router.query.search && !searchValue) {
        //console.log("setSearch");
        //setSearchValue(String(router.query.search));
      }
    }
  }, [router.isReady]);

  useEffect(() => {
    if (debouncedSearchValue) {
      router.push(
        {
          pathname: router.pathname,
          query: {
            search: debouncedSearchValue,
          },
        },
        undefined,
        { shallow: true }
      );
    }
  }, [debouncedSearchValue]);

  useEffect(() => {
    if (router.isReady) {
      if (!preload) {
        getApis(router.query);
      } else {
        getApis(router.query);
        setPreload(false);
      }
    }
  }, [router.query]);

  const getApis = async (par: any) => {
    const params: any = {};
    if (router.query?.search) {
      params.search = router.query.search;
    }

    if (router.query?.page) {
      params.page = router.query?.page;
    }
    if (preload) {
      params.preload = true;
    }

    setPreload(false);

    const {
      data: { apis: searchResult },
    } = await axios.get(domain + `/api/apis/active`, { params });

    const apis = searchResult?.apis || [];

    const newSearchVal = debouncedSearchValue
      ? debouncedSearchValue !== currSearchVal.current
      : false;

    const sameParams = JSON.stringify(params) === searchParams?.current;

    const replaceWithNewApis = preload || newSearchVal || sameParams;

    const items = replaceWithNewApis ? apis : [...dapp.apis.items, ...apis];

    currSearchVal.current = debouncedSearchValue;
    searchParams.current = JSON.stringify(params);

    dispatch({
      type: "SET_AVAILABLE_APIS",
      payload: {
        //@ts-ignore
        items: items,
        total: apis.length < 1 ? -1 : searchResult?.totalCount,
      },
    });
  };

  return [searchValue, setSearchValue];
};

export default useFindApis;
