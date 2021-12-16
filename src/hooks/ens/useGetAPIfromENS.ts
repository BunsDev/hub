import { domain } from "../../constants";
import ApiUris from "../../api/entities/apiUris";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useWeb3ApiClient } from "@web3api/react";
import { useStateValue } from "hooks";
import { networks } from "utils/networks";

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
  favorites: number;
  locationUri: string;
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
          domain + `/api/apis/${router.asPath.split("uri=")[1]}`
        );

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
  const [{ dapp }] = useStateValue();
  const [error, setError] = useState<any>(); // eslint-disable-line
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<APIData | APIDataFromManifest>();
  const client = useWeb3ApiClient();

  const fetchApiDetails = useCallback(async () => {
    setIsLoading(true);
    try {
      if (router.query.uri || router.query.customUri) {
        const [location, uri] = String(
          router.query.uri || router.query.customUri
        ).split("/");
        const apiLocation =
          location === "ipfs"
            ? `${location}/${uri}`
            : `${location}/${
                networks[dapp?.network]?.name || "mainnet"
              }/${uri}`;
        const meta = await client.getManifest(apiLocation, {
          type: "meta",
        });
        const { name, description, icon } = meta;
        const obj: APIDataFromManifest = {
          description,
          icon,
          name,
          apiUris: [`${location}/${uri}`],
        };
        setData(obj);
      }
    } catch (e) {
      console.log(e);
      setError(e);
    } finally {
      setIsLoading(false);
    }
  }, [router.query.uri, router.query.customUri, dapp?.network]);

  useEffect(() => {
    if (router.isReady) {
      void fetchApiDetails();
    }
  }, [router.isReady, router.query.uri, router.query.customUri]);
  return { error, isLoading, data, fetchApiDetails };
};

export default useGetAPIfromENSParamInURL;
