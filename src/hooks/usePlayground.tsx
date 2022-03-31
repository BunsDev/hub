import { useWeb3ApiClient, useWeb3ApiQuery } from "@web3api/react";
import type { UseWeb3ApiQuery } from "@web3api/react/build/query";
import { useStateValue } from "hooks";
import { useCallback, useEffect, useState } from "react";
import getPackageQueriesFromUri from "services/ipfs/getPackageQueriesFromUri";
import cleanSchema, { StructuredSchema } from "utils/cleanSchema";
import { networks } from "utils/networks";
import { APIData, APIDataFromManifest } from "./ens/useGetAPIfromENS";

export interface QueryAttributes {
  id: string;
  value: string;
  vars?: string;
}

interface APIContents {
  schema?: string;
  schemaStructured?: StructuredSchema;
  queries?: QueryAttributes[];
}

interface ApiState {
  apiContents: APIContents;
  apiLocation: string;
  error: Error;
  loading: boolean;
}

interface QueryMethod {
  id: string;
  value: string;
}
interface UseWeb3ApiQueryExtended extends UseWeb3ApiQuery {
  method: QueryMethod;
  setMethod: React.Dispatch<React.SetStateAction<QueryMethod>>;
}

const usePlayground = (
  api: APIData | APIDataFromManifest
): [ApiState, UseWeb3ApiQueryExtended] => {
  const [{ dapp }] = useStateValue();
  const client = useWeb3ApiClient();

  const [apiState, setApiState] = useState<ApiState>({
    apiContents: { queries: [], schema: "" },
    apiLocation: "",
    loading: false,
    error: null,
  });

  const [queryMethod, setQueryMethod] = useState<QueryMethod>({
    id: "",
    value: "",
  });

  const query = useWeb3ApiQuery({
    uri: apiState.apiLocation,
    query: queryMethod.value,
  });

  const loadApiContent = useCallback(async () => {
    setApiState((prev) => ({ ...prev, loading: true }));

    const [location, uri] = (api.apiUris[0] as string)?.split("/");
    const apiLocation =
      location === "ipfs"
        ? `${location}/${uri}`
        : `${location}/${networks[dapp?.network]?.name || "mainnet"}/${uri}`;

    try { 
      const schema = await client.getSchema(apiLocation);
      const queries = await getPackageQueriesFromUri(client, apiLocation);

      setApiState((prev) => ({
        ...prev,
        apiLocation,
        apiContents: { queries, schema, schemaStructured: cleanSchema(schema) },
        loading: false,
      }));
    } catch (e) {
      setApiState((prev) => ({
        ...prev,
        loading: false,
        error: e,
      }));
    }
  }, [api, dapp?.network]);

  useEffect(() => {
    api && loadApiContent();
  }, [api]);

  return [
    apiState,
    { ...query, method: queryMethod, setMethod: setQueryMethod },
  ];
};

export default usePlayground;
