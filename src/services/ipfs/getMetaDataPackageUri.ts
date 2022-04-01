import { AnyMetaManifest, AnyWeb3ApiManifest } from "@web3api/core-js";
import { Web3ApiClient } from "@web3api/client-js";
import { APIDataFromManifest } from "hooks/ens/useGetAPIfromENS";

const constructApiDataFromMeta = async (metadata: AnyMetaManifest) => {
  const { description, icon, subtext } = metadata;
  const name =
    "displayName" in metadata
      ? metadata.displayName
      : "name" in metadata
      ? metadata.name
      : "";
  return { name, description, subtext, icon };
};

const constructApiDataFromWeb3Api = async (web3api: AnyWeb3ApiManifest) => {
  const name = "name" in web3api ? web3api.name : "";

  return { name };
};

export default async function getMetaDataFromPackageUri(
  client: Web3ApiClient,
  uriInput: string
): Promise<APIDataFromManifest> {
  try {
    const metadata = await client.getManifest(uriInput, { type: "meta" });
    console.log('metadata', metadata)
    return constructApiDataFromMeta(metadata);
  } catch (e) {
    try {
      const web3api = await client.getManifest(uriInput, { type: "web3api" });
      console.log('web3api', web3api)
      return constructApiDataFromWeb3Api(web3api);
    } catch (e) {
      return undefined;
    }
  }
}
