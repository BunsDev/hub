import StarredApiRepository from "../../../../../api/repositories/starredApiRepository";
import { User } from "../../../../../api/models/User";

import { VercelRequest, VercelResponse } from "@vercel/node";
import { getConnection } from "typeorm";

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

      const id = md5(userDid);

      const data = await User.getFavorites(id);
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
