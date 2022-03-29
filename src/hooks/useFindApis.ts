import {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDebounce, useStateValue } from "hooks";
import { domain } from "src/constants";
import useRouter from "./useRouter";
import axios from "axios";

const useFindApis = (
  delay = 500
): [string, Dispatch<SetStateAction<string>>] => {
  const [searchValue, setSearchValue] = useState("");
  const [routerReady, setRouterReady] = useState(false);
  const [{ dapp }, dispatch] = useStateValue();
  const [debouncedSearchValue, prevSearchValue] = useDebounce(
    searchValue,
    delay
  );
  const [preload, setPreload] = useState(true);
  const router = useRouter();
  const searchParams = useRef<string>();

  const currSearchVal = useRef<string>();

  useEffect(() => {}, []);

  useEffect(() => {
    if (router.isReady) {
      setRouterReady(true);
      if (router?.query?.search) {
        setSearchValue(String(router?.query?.search));
      }
    }
  }, [router.isReady]);

  useEffect(() => {
    if (routerReady) {
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
    }
  }, [debouncedSearchValue]);

  useEffect(() => {
    if (routerReady) {
      if (!preload) {
        getApis();
      } else {
        getApis();
        setPreload(false);
      }
    }
  }, [router.query, routerReady]);

  const getApis = async () => {
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
