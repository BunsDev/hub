import { APIData } from "hooks/ens/useGetAPIfromENS";
import { ApiData } from "src/api/models/types";
import { API_URI_TYPE_ID } from "../constants";

// eslint-disable-line
export default function sanitizeApis(acc: ApiData[], api: any): ApiData[] {
  const { authority, type, uri, name, ...metadata } = api; // eslint-disable-line

  const apiIndex = acc.findIndex(({ name }) => name === api.name);

  const apiSanitized = {
    ...metadata,
    name,
    apiUris: [],
    ...(acc[apiIndex] || {}),
  };

  if (api.type === "storage") {
    apiSanitized.locationUri = api.uri;
  } else {
    apiSanitized.apiUris.push(api.uri);
  }

  if (apiIndex === -1) return [...acc, apiSanitized];
  acc[apiIndex] = apiSanitized;

  return acc;
}

export function attachLocationUri(api: APIData): APIData {
  const locationUri = api.apiUris?.find(
    (uri) => uri.uriTypeId === API_URI_TYPE_ID.ipfs
  );
  return {
    ...api,
    locationUri: locationUri?.uri,
    apiUris: api.apiUris.filter((uri) => uri.uriTypeId === API_URI_TYPE_ID.ens),
  };
}
