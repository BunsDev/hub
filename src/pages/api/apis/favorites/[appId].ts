import StarredApiRepository from "../../../../api/repositories/starredApi";
import { getConnection } from "typeorm";
import { VercelRequest, VercelResponse } from "@vercel/node";
import ApiRepository from "src/api/repositories/api";
import Database from "../../db";

export default async (request: VercelRequest, response: VercelResponse) => {
  if (request.method === "GET") {
    try {
      const appId: string | undefined = request.query.appId as string;

      if (!appId) {
        return response.json({
          status: 400,
          message: "Attribute appId not found in request query",
        });
      }

      const database = new Database();
      await database.connect();

      const starredApiRepository =
        getConnection().getCustomRepository(StarredApiRepository);
      const apiRepository = getConnection().getCustomRepository(ApiRepository);

      const data = await apiRepository.getFavorites(appId);
      const count = await starredApiRepository.getFavoritesCountByApiId(appId);

      return response.json({
        status: 200,
        data,
        count,
      });
    } catch (error) {
      return response.json({ status: 500, error: error.message });
    }
  }
};
