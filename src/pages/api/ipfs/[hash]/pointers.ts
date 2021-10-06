import Database from "../../db";
import UriCacheRepository from "../../../../api/repositories/uriCacheRepository";
import { Authorities } from "../../../../api/models/Api";
import ApiRepository from "../../../../api/repositories/api";
import ApiUrisRepository from "../../../../api/repositories/apiUrisRepository";

import { VercelRequest, VercelResponse } from "@vercel/node";
import { getCustomRepository } from "typeorm";
import { Web3ApiClient } from "@web3api/client-js";

export default async (request: VercelRequest, response: VercelResponse) => {
  if (request.method === "GET") {
    try {
      const { hash } = request.query;

      const database = new Database();
      await database.connect();

      const uriCaches = await getCustomRepository(
        UriCacheRepository
      ).findUrisByIpfsHash(hash as string);

      const apiRepository = await getCustomRepository(ApiRepository);
      const apiUrisRepository = await getCustomRepository(ApiUrisRepository);

      const client = new Web3ApiClient();

      for (const uri of uriCaches) {
        const manifest = await client.getManifest(
          uri.uri.replace("ens/", "ens/ropsten/"),
          {
            type: "meta",
          }
        );

        const existsUri = await apiUrisRepository.findByUri(uri.uri);
        if (existsUri) {
          await apiRepository.updateById(
            existsUri.id,
            manifest.name,
            manifest.subtext,
            manifest.description,
            manifest.icon
          );
        } else {
          const newApi = await apiRepository.add(
            manifest.name,
            manifest.subtext,
            manifest.description,
            manifest.icon,
            null
          );

          await apiUrisRepository.add(uri.uri, newApi.id, Authorities.IPFS);
        }
      }

      return response.json({
        status: 200,
        pointers: uriCaches.map((uriCache) => uriCache.uri),
      });
    } catch (error) {
      return response.json({
        status: 500,
        error: error.message,
      });
    }
  }
};
