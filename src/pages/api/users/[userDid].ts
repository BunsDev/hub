import { VercelRequest, VercelResponse } from "@vercel/node";
import { getConnection } from "typeorm";
import ApiRepository from "src/api/repositories/api";
import logger from "services/logger/logger";

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

      const apiRepository = getConnection().getCustomRepository(ApiRepository);

      const id = md5(userDid);
      const apis = await apiRepository.getPublishedApis(id);
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
