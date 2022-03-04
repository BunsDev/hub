import { ghCallback } from "../../../../../api/services/github/strategy";

import { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";
import logger from "services/logger/logger";

export default async (request: VercelRequest, response: VercelResponse) => {
  if (request.method === "GET") {
    const data = {
      client_id: process.env.GITHUB_CLIENT_ID, // eslint-disable-line
      client_secret: process.env.GITHUB_CLIENT_SECRET, // eslint-disable-line
      code: request.query.code,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json", // eslint-disable-line
      },
    };

    const codeRequest = await axios.post(
      "https://github.com/login/oauth/access_token",
      data,
      config
    );

    if ("error" in codeRequest.data) {
      logger.error(codeRequest.data.error);
      return response.json({
        status: 503,
        message: codeRequest.data.error,
      });
    }

    try {
      const ghCredentials = await ghCallback(codeRequest.data.access_token);
      return response.json({
        status: 200,
        ...codeRequest.data,
        ...ghCredentials,
      });
    } catch (error) {
      logger.error(error.message);
      return response.json({
        status: 503,
        error: error.message,
      });
    }
  }
};
