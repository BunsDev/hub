import { VercelRequest, VercelResponse } from "@vercel/node";
import ApiRepository from "src/api/repositories/api";
import { getConnection } from "typeorm";

export default async (request: VercelRequest, response: VercelResponse) => {
  if (request.method === "GET") {
    try {
      const { location, name } = request.query;

      const apiRepository = getConnection().getCustomRepository(ApiRepository);
      const api = await apiRepository.getByLocation(
        location as string,
        name as string
      );
      return response.json({
        status: 200,
        api,
      });
    } catch (error) {
      return response.json({
        status: 500,
        error: error.message,
      });
    }
  }
};
