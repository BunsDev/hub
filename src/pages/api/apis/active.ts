import Database from "../db";
import { PaginationMeta } from "../../../api/models/types";
import ApiRepository from "../../../api/repositories/apiRepository";

import { VercelRequest, VercelResponse } from "@vercel/node";
import { getCustomRepository } from "typeorm";

export default async (request: VercelRequest, response: VercelResponse) => {
  if (request.method === "GET") {
    try {
      const limit = request.query.limit ? Number(request.query.limit) : 10;
      const page = request.query.page ? Number(request.query.page) : 1;

      const database = new Database();
      await database.connect();

      const apis = await getCustomRepository(ApiRepository).getAllActive();
      const totalCount = await getCustomRepository(
        ApiRepository
      ).getAllActiveCount();

      const meta: PaginationMeta = {
        limit,
        page,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        max_page: Math.ceil(totalCount / limit) || 1,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        total_count: totalCount,
      };

      return response.json({
        status: 200,
        apis,
        meta,
      });
    } catch (error) {
      return response.json({ status: 500, error: error.message });
    }
  }
};
