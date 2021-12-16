import Database from "../db";
import UriCacheRepository from "../../../api/repositories/uriCacheRepository";

import { VercelRequest, VercelResponse } from "@vercel/node";
import { getCustomRepository } from "typeorm";

export default async (request: VercelRequest, response: VercelResponse) => {
  if (request.method === "POST") {
    try {
      const { ipfs, ens } = request.body;

      const database = new Database();
      await database.connect();

      const uriCache = await getCustomRepository(UriCacheRepository).findByUri(
        ens as string
      );

      if (uriCache && uriCache.ipfs === ipfs) {
        // Duplicate, do nothing
        return response.json({
          status: 200,
        });
      }

      if (uriCache) {
        return response.json({
          status: 409, // Conflict
          error: `ENS ${ens} already exists`,
        });
      }

      await getCustomRepository(UriCacheRepository).add(
        ens as string,
        ipfs as string
      );

      return response.json({
        status: 200,
      });
    } catch (error) {
      return response.json({
        status: 500,
        error: error.message,
      });
    }
  }
};
