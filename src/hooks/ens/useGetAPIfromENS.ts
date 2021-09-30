import { domain, networkID, networkName } from "../../constants";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useWeb3ApiClient } from "@web3api/react";
import { networks } from "utils/networks";

export interface APIDataFromManifest {
  name: string;
  description: string;
  icon: string;
  pointerUris: string[];
}
export interface APIData {
  id: number;
  name: string;
  subtext: string;
  description: string;
  icon: string;
  locationUri: string;
  favorites: number;
  pointerUris: string[];
}

export const useGetAPIfromENSParamInURL = () => {
  const router = useRouter();
  const [error, setError] = useState<any>(); // eslint-disable-line
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<APIData | APIDataFromManifest>();
  const client = useWeb3ApiClient();

  const fetchApiDetails = useCallback(async () => {
    setIsLoading(true);
    try {
      if (router.query.uri) {
        const { data: apiData } = await axios.get<{ api: APIData }>(
          domain + `/api/apis/ens/${router.asPath.split("ens/")[1]}`
        );
        setData(apiData.api);
      }

      if (router.query.customUri) {
        const uri = String(router.query.customUri).split("ens/")[1];
        const meta = await client.getManifest(`ens/${networkName}/${uri}`, {
          type: "meta",
        });

        const { name, description, icon } = meta;
        const obj: APIDataFromManifest = {
          description,
          icon,
          name,
          pointerUris: [uri],
        };
        setData(obj);
      }
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  }, [router.query.uri, router.query.customUri]);

  useEffect(() => {
    if (router.isReady) {
      void fetchApiDetails();
    }
  }, [router.isReady, router.query.uri, router.query.customUri]);
  return { error, isLoading, data, fetchApiDetails };
};

export default useGetAPIfromENSParamInURL;
