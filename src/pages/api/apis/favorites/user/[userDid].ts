import StarredApiRepository from "../../../../../api/repositories/starredApi";

import { VercelRequest, VercelResponse } from "@vercel/node";
import { getConnection } from "typeorm";
import ApiRepository from "src/api/repositories/api";

const md5 = require("md5"); // eslint-disable-line

export default async (request: VercelRequest, response: VercelResponse) => {
  if (request.method === "GET") {
    try {
      const { userDid } = request.query;
      if (!userDid) {
        return response.json({
          status: 400,
          message: "Attribute userDid not found in request query",
        });
      }

      const starredApiRepository =
        getConnection().getCustomRepository(StarredApiRepository);
      const apiRepository = getConnection().getCustomRepository(ApiRepository);

      const id = md5(userDid);

      const data = await apiRepository.getFavoritesByUserId(id);
      const count = await starredApiRepository.getFavoritesCountByUserId(id);

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
