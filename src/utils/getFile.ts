import { Web3ApiClient } from "@web3api/client-js";

export const getReadme = async (client: Web3ApiClient, apiLocation: string) => {
  try {
    return await client.getFile(apiLocation, {
      path: "/README.md",
    });
  } catch (e) {
    console.log(e);
    return undefined;
  }
};
export const getExampleQuery = async (
  client: Web3ApiClient,
  apiLocation: string
) => {
  try {
    const metadata = await client.getManifest(apiLocation, {
      type: "meta",
    });

    const { queries } = metadata;

    const queryPath = queries[0].query.split("./")[1];
    const varsPath = queries[0].vars.split("./")[1];
    const queryFile = await client.getFile(apiLocation, {
      path: queryPath,
    });
    const varsFile = await client.getFile(apiLocation, {
      path: varsPath,
    });

    return {
      query: queryFile.toString(),
      vars: varsFile.toString(),
    };
  } catch (e) {
    return undefined;
  }
};
