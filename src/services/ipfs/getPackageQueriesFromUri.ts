import { Web3ApiClient } from "@web3api/client-js";

export default async function getPackageQueriesFromUri(
  client: Web3ApiClient,
  path: string
) {
  const metadata = await client.getManifest(path, { type: "meta" });
  if ("queries" in metadata) {
    const { queries } = metadata;
    const queriesData = [];
    for await (const query of queries) {
      try {
        const queryBuffer = await client.getFile(path, {
          path: query.query.split("./")[1],
        });
        const varsBuffer = await client.getFile(path, {
          path: query.vars.split("./")[1],
        });
        const pathArray = query.query.split(".graphql")[0].split("/");
        const key = pathArray[pathArray.length - 1];

        const obj = {
          id: key,
          value: queryBuffer.toString(),
          vars: varsBuffer.toString(),
        };
        queriesData.push(obj);
      } catch (e) {
        console.log(e);
      }
    }

    queriesData.push({
      id: "custom",
      value: "\n\n\n\n\n\n\n\n\n\n",
      vars: "",
    });

    return queriesData;
  }
}
