import { APIData } from "hooks/ens/useGetAPIfromENS";
import { API_URI_TYPE_ID, ipfsGateway } from "src/constants";

const parseEns = (uri: string) => uri.split("/").find((s) => s.includes("."));

const parseIpfs = (uri: string) => {
  //TODO better way to validate ipfs
  return uri
    .split("/")
    .reduce(
      (prev, current) => (current.length > prev.length ? current : prev),
      ""
    );
};

export const parseApiUri = (uri: string) => {
  //1.Check if ipfs or ens
  const ens = uri.includes(".");
  if (ens) return [parseEns(uri), "ens"];
  return [parseIpfs(uri), "ipfs"];
};

export const resolveApiLocation = (api: APIData) => {
  return api && api.apiUris.length
    ? "ens/" + api.apiUris[0].uri
    : "ipfs/" + api?.locationUri;
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
  return (
    api.icon &&
    `${ipfsGateway}${getIpfsLocation(api)}${api.icon.replace("./", "/")}`
  );
};
