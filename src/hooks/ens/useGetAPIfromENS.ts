import { domain, networkName } from "../../constants";
import ApiUris from "../../api/entities/apiUris";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useWeb3ApiClient } from "@web3api/react";

export interface APIDataFromManifest {
  name: string;
  description: string;
  icon: string;
  apiUris: string[];
}
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
      if (router.query.uri) {
        const { data: apiData } = await axios.get<{ api: APIData }>(
          domain + `/api/apis/ens/${router.asPath.split("ens/")[1]}`
        );

        //@ts-ignore
        console.log({ apiData });
        setData(apiData.api);
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

export const useGetAPIfromParamInURL = () => {
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
        //@ts-ignore
        setData(apiData.api[0]);
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
          apiUris: [uri],
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
