import { APIDataFromManifest } from "hooks/ens/useGetAPIfromENS";
import { ApiData } from "src/api/models/types";
import { domain } from "src/constants";

export interface PublishOptions {
  location: "ipfs" | "ens" | string;
  uri: string;
  did?: string;
}

type PublishBody = Omit<ApiData, "id" | "ownerId"> & { did?: string };

export const publishFromMeta = async (
  meta: APIDataFromManifest,
  options: PublishOptions
) => {
  const { location, uri } = options;
  const body = constructPublishBodyFromMeta(meta);
  body.locationUri = location === "ipfs" ? uri : ""; // TODO: GET IPFS HASH IF INPUT IS ENS

  if (options.did) body.did = options.did;

  if (location === "ens") body.apiUris = [uri];
  void publishWrapper(body);
};
export const constructPublishBodyFromMeta = (
  meta: APIDataFromManifest
): Partial<PublishBody> => {
  const { description, icon, subtext, name } = meta;

  return {
    name,
    description,
    icon,
    subtext,
  };
};

export const publishWrapper = async (
  body: PublishBody | Partial<PublishBody>
) => {
  return await fetch(domain + "/api/apis/publish", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
