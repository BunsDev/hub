import UserRepository from "../../../api/repositories/user";

import { VercelRequest, VercelResponse } from "@vercel/node";
import { getConnection } from "typeorm";
import logger from "services/logger/logger";

const md5 = require("md5"); // eslint-disable-line

export default async (request: VercelRequest, response: VercelResponse) => {
  if (request.method === "POST") {
    const { did } = request.body;
    const hashedDid = md5(did);
    try {
      const userRepository =
        getConnection().getCustomRepository(UserRepository);
      await userRepository.findOrCreate(hashedDid);
      return response.json({
        status: 200,
      });
    } catch (error) {
      logger.error(error.message);
      response.json({
        status: 500,
        error: error.message,
      });
    }
  }
};
