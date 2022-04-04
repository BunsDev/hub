import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useDebounce, useStateValue } from "hooks";
import { domain } from "src/constants";
import { useRouter } from "next/router";
import axios from "axios";

const useFindApis = (
  delay = 500
): [string, Dispatch<SetStateAction<string>>] => {
  const router = useRouter();

  const [searchValue, setSearchValue] = useState(
    router.query?.search ? router.query?.search?.toString() : ""
  );
  const [{ dapp }, dispatch] = useStateValue();
  const [debouncedSearchValue] = useDebounce(
    searchValue,
    delay,
    router.query?.search ? router.query?.search?.toString() : ""
  );
  const [preload, setPreload] = useState(true);
  const searchParams = useRef<string>();

  const currSearchVal = useRef<string>(
    router.query?.search ? router.query?.search?.toString() : ""
  );

  useEffect(() => {
    if (typeof debouncedSearchValue === "string") {
      const params: { [key: string]: string } = {};
      if (debouncedSearchValue) {
        params.search = debouncedSearchValue;
      }
      void router.push(
        {
          pathname: router.pathname,
          query: params,
        },
        undefined,
        { shallow: true }
      );
    }
  }, [debouncedSearchValue]);

  useEffect(() => {
    if (!dapp.initialApisLoading) {
      void getApis();
    }

    if (!router.query.search) {
      setSearchValue("");
    }
  }, [router.query]);

  useEffect(() => {
    void getApis();
  }, []);

  const getApis = async () => {
    const params: { [key: string]: string | string[] | boolean } = {};
    if (router.query?.search) {
      params.search = router.query.search;
    }

    if (router.query?.page) {
      params.page = router.query?.page;
    }
    if (preload) {
      params.preload = true;
      setPreload(false);
    }

    const newSearchVal =
      String(debouncedSearchValue) !== String(currSearchVal.current);

    const noParams = Object.keys(params).length === 0;

    if (newSearchVal || noParams) {
      dispatch({ type: "SET_INITIAL_APIS_LOADING", payload: true });
    }

    const sameParams = JSON.stringify(params) === searchParams?.current;

    if (!sameParams) {
      const {
        data: { apis: searchResult },
      } = await axios.get(domain + `/api/apis/active`, { params });

      const apis = searchResult?.apis || [];


      const replaceWithNewApis =
        dapp.initialApisLoading || preload || newSearchVal || noParams;

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
    }

    dispatch({ type: "SET_INITIAL_APIS_LOADING", payload: false });
  };

  return [searchValue, setSearchValue];
};

export default useFindApis;
