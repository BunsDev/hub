import { VercelRequest, VercelResponse } from "@vercel/node";
import { APIData } from "hooks/ens/useGetAPIfromENS";
import logger from "services/logger/logger";
import ApiUrisRepository from "src/api/repositories/apiUrisRepository";
import { getConnection } from "typeorm";
import { attachLocationUri } from "utils/sanitizeApis";
import Database from "../../db";

export default async (request: VercelRequest, response: VercelResponse) => {
  if (request.method === "GET") {
    try {
      const { name } = request.query;

      const database = new Database();
      await database.connect();

      const apiUrisRepository =
        getConnection().getCustomRepository(ApiUrisRepository);

      const apiUri = await apiUrisRepository.findOne({
        where: { uri: name },
        relations: ["api"],
      });

      if (!apiUri) {
        throw Error("Not Found");
      }

      const apiUris = await apiUrisRepository.find({
        where: { apiId: apiUri.apiId },
      });

      return response.json({
        status: 200,
        api: attachLocationUri({
          ...apiUri.api,
          apiUris,
        } as unknown as APIData),
      });
    } catch (error) {
      logger.error(error.message);
      return response.json({
        status: 500,
        error: error.message,
      });
    }
  }
};
