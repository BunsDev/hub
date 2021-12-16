import Database from "../db";
import { PaginationMeta } from "../../../api/models/types";
import ApiRepository from "../../../api/repositories/api";

import { VercelRequest, VercelResponse } from "@vercel/node";
import { getCustomRepository } from "typeorm";

export default async (request: VercelRequest, response: VercelResponse) => {
  if (request.method === "GET") {
    try {
      const limit = request.query.limit ? Number(request.query.limit) : 10;
      const page = request.query.page ? Number(request.query.page) : 1;
      const searchValue = request.query.value ? String(request.query.value) : null;

      const database = new Database();
      await database.connect();

      const apiRepository = getCustomRepository(ApiRepository);

      const apis = await apiRepository.search(limit, page, searchValue);
      const totalCount = await apiRepository.searchCount(searchValue);

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
