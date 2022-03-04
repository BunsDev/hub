import Database from "../db";
import { ApiData } from "../../../api/models/types";
import ApiRepository from "../../../api/repositories/api";
import { checkContentIsValid } from "../../../api/services/ens";

import { VercelRequest } from "@vercel/node";
import { getCustomRepository } from "typeorm";
import logger from "services/logger/logger";

export default async (request: VercelRequest) => {
  if (request.method === "POST") {
    try {
      const database = new Database();
      await database.connect();

      const apiRepository = getCustomRepository(ApiRepository);
      const apis = await apiRepository.getAllActive();

      /*       apis.forEach(async (api: ApiData) => {
        const { valid } = await checkContentIsValid(
          api.apiUris,
          api.locationUri
        );
        if (!valid) {
          await apiRepository.deactivate(api.id);
        }
      }); */
    } catch (error) {
      logger.error(error.message);
      console.log("Error when checking and updating apis -> ", error.message);
    }
  }
};
