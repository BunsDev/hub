import { domain } from "../../constants";
import ApiUris from "../../api/entities/apiUris";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export interface APIData {
  id: number;
  name: string;
  subtext: string;
  description: string;
  icon: string;
  locationUri: string;
  favorites: number;
  apiUris: ApiUris[];
}

export const useGetAPIfromENSParamInURL = () => {
  const router = useRouter();
  const [error, setError] = useState<any>(); // eslint-disable-line
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<APIData>();

  const fetchApiDetails = useCallback(async () => {
    setIsLoading(true);
    try {
      if (router.query.uri !== undefined) {
        const { data: apiData } = await axios.get<{ api: APIData }>(
          domain + `/api/apis/ens/${router.asPath.split("ens/")[1]}`
        );
        setData(apiData.api);
      }
    } catch (e) {
      setError(e);
    }
    setIsLoading(false);
  }, [router.query.uri]);

  useEffect(() => {
    if (router.isReady) {
      void fetchApiDetails();
    }
  }, [router.isReady, router.query.uri]);
  return { error, isLoading, data, fetchApiDetails };
};

export default useGetAPIfromENSParamInURL;
