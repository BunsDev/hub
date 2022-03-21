import Database from "../db";
import ApiRepository from "../../../api/repositories/api";

import { VercelRequest, VercelResponse } from "@vercel/node";
import { getCustomRepository } from "typeorm";
import logger from "services/logger/logger";

export default async (request: VercelRequest, response: VercelResponse) => {
  if (request.method === "GET") {
    try {
      const database = new Database();
      await database.connect();
      const { search, page, take, preload } = request.query;

      const apis = await getCustomRepository(ApiRepository).getActive(
        search as string,
        page as string,
        take as string,
        Boolean(preload) as boolean
      );

      return response.json({
        status: 200,
        apis,
      });
    } catch (error) {
      logger.error(error.message);
      return response.json({ status: 500, error: error.message });
    }
  }
};
