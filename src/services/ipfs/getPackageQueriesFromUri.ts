import { Web3ApiClient } from "@web3api/client-js";
import { APIData } from "hooks/ens/useGetAPIfromENS";
import { networkID, networkName } from "src/constants";
import { networks } from "utils/networks";

export default async function getPackageQueriesFromUri(
  client: Web3ApiClient,
  api: APIData
) {
  const metadata = await client.getManifest(
    `ens/${networkName}/${api.pointerUris[0]}`,
    { type: "meta" }
  );
  if ("queries" in metadata) {
    const { queries } = metadata;

    const queriesData = [];
    for await (const query of queries) {
      try {
        const file = await client.getFile(
          `ens/${networkName}/${api.pointerUris[0]}`,
          {
            path: query.query.split('./')[1],
          }
        );
        const key = query.query.split(`/queries/`)[1].split(".graphql")[0];

        const obj = {
          id: key,
          value: file.toString(),
        };
        queriesData.push(obj);
      } catch (e) {
        console.log(e);
      }
    }

    queriesData.push({
      id: "custom",
      value: "\n\n\n\n\n\n\n\n\n\n",
    });

    return queriesData;
  }
}
