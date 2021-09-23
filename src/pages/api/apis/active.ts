import Database from "../db";
import ApiRepository from "../../../api/repositories/api";

import { VercelRequest, VercelResponse } from "@vercel/node";
import { getCustomRepository } from "typeorm";

export default async (request: VercelRequest, response: VercelResponse) => {
  if (request.method === "GET") {
    try {
      const database = new Database();
      await database.connect();

      const apis = await getCustomRepository(ApiRepository).getAllActive();

      return response.json({
        status: 200,
        apis,
      });
    } catch (error) {
      return response.json({ status: 500, error: error.message });
    }
  }
};
