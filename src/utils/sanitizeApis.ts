import { ApiData } from "src/api/models/types";

export default function sanitizeApis(acc: ApiData[], api: any): ApiData[] { // eslint-disable-line
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
