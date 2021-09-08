import Database from "../../db";
import UriCacheRepository from "../../../../api/repositories/uriCacheRepository";

import { VercelRequest, VercelResponse } from "@vercel/node";
import { getCustomRepository } from "typeorm";

export default async (request: VercelRequest, response: VercelResponse) => {
  if (request.method === "GET") {
    try {
      const { hash } = request.query;

      const database = new Database();
      await database.connect();

      const uriCaches = await getCustomRepository(
        UriCacheRepository
      ).findUrisByIpfsHash(hash as string);

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
