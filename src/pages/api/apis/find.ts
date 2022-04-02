import Database from "../db";
import { VercelRequest, VercelResponse } from "@vercel/node";
import { getCustomRepository } from "typeorm";
import logger from "services/logger/logger";
import ApiUrisRepository from "src/api/repositories/apiUrisRepository";
import { parseApiUri } from "utils/pathResolvers";

export default async (request: VercelRequest, response: VercelResponse) => {
  if (request.method === "GET") {
    try {
      const database = new Database();
      await database.connect();
      const { uri } = request.query;

      const [input, type] = parseApiUri(String(uri));

      const apiUri = await getCustomRepository(ApiUrisRepository).findOne({
        where: { uri: input },
      });
      console.log("apiUri", apiUri);
      if (!apiUri) {
        return response.json({ status: 404 });
      }
      return response.json({ status: 200, published: `${type}/${input}` });
    } catch (error) {
      logger.error(error.message);
      return response.json({ status: 500, error: error.message });
    }
  }
};
