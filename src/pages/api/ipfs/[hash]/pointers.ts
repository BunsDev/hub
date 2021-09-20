import Database from "../../db";
import UriCacheRepository from "../../../../api/repositories/uriCacheRepository";

import { VercelRequest, VercelResponse } from "@vercel/node";
import { getCustomRepository } from "typeorm";
import { Web3ApiClient } from "@web3api/client-js";

export default async (request: VercelRequest, response: VercelResponse) => {
  if (request.method === "GET") {
    try {
      const { hash } = request.query;

      const database = new Database();
      await database.connect();

      const client = new Web3ApiClient();

      const metadata = await client.getManifest(
        "ens/ropsten/yay2.open.web3api.eth",
        {
          type: "meta",
        }
      );

      // TODO: get file
      const t = await client.getFile("ens/ropsten/yay2.open.web3api.eth", {
        path: metadata.queries[0].query,
      });

      console.log({ t });

      const uriCaches = await getCustomRepository(
        UriCacheRepository
      ).findUrisByIpfsHash(hash as string);

      return response.json({
        status: 200,
        pointers: uriCaches.map((uriCache) => uriCache.uri),
        metadata,
      });
    } catch (error) {
      return response.json({
        status: 500,
        error: error.message,
      });
    }
  }
};
