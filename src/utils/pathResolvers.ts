import { APIData } from "hooks/ens/useGetAPIfromENS";
import { API_URI_TYPE_ID, ipfsGateway } from "src/constants";

export const resolveApiLocation = (api: APIData) => {
  return api.apiUris.length
    ? "ens/" + api.apiUris[0].uri
    : "ipfs/" + api?.locationUri;

  if (typeof api.apiUris[0] === "string") {
    //@ts-ignore TODO backand location uri removement
    return api?.locationUri
      ? //@ts-ignore
        `ipfs/${api.locationUri}`
      : `ens/${api.apiUris[0]}`;
  }
  if (typeof api.apiUris[0] === "object") {
    const ensLocation = api.apiUris.find(
      (uri) => uri.uriTypeId === API_URI_TYPE_ID.ens
    );
    if (ensLocation) return `ens/${ensLocation.uri}`;
    return `ipfs/${api.apiUris[0].uri}`;
  }
};

export const getIpfsLocation = (api: APIData) => {
  if (api.locationUri) return api.locationUri;
  const ipfsLocation = api.apiUris.find(
    (uri) => uri.uriTypeId === API_URI_TYPE_ID.ipfs
  );
  //@ts-ignore TODO Change after backand return correct apiUris for /api/apis/[location]/[name]
  return ipfsLocation?.uri || api?.locationUri;
};

export const getApiImgLocation = (api: APIData) => {
  return `${ipfsGateway}${getIpfsLocation(api)}${api.icon.replace("./", "/")}`;
};
