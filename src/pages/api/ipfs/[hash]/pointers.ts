import Database from "../../db";
import UriCacheRepository from "../../../../api/repositories/uriCacheRepository";

import { VercelRequest, VercelResponse } from "@vercel/node";
import { getCustomRepository } from "typeorm";
import { Uri, Web3ApiClient } from "@web3api/client-js";
import { ipfsPlugin } from "@web3api/ipfs-plugin-js";

export default async (request: VercelRequest, response: VercelResponse) => {
  if (request.method === "GET") {
    try {
      const { hash } = request.query;

      const database = new Database();
      await database.connect();

      const client = new Web3ApiClient({
        plugins: [
          {
            uri: new Uri("w3://ens/ipfs.web3api.eth").toString(),
            plugin: ipfsPlugin({
              provider: "https://ipfs.io",
              fallbackProviders: [
                "https://polywrap-dev.mypinata.cloud",
                "https://ipfs.infura.io",
              ],
            }),
          },
        ],
      });
      console.log({ hash });

      const info = await client.query({
        uri: "ens/ipfs.web3api.eth",
        query: `query {
          catFile(cid: $cid)
        }`,
        variables: {
          cid: `/ipfs/${hash}`,
        },
      });
      console.log(info);

      const uriCaches = await getCustomRepository(
        UriCacheRepository
      ).findUrisByIpfsHash(hash as string);

      return response.json({
        status: 200,
        pointers: uriCaches.map((uriCache) => uriCache.uri),
        info,
      });
    } catch (error) {
      return response.json({
        status: 500,
        error: error.message,
      });
    }
  }
};
