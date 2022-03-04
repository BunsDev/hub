import { fetchOrganizations } from "../../../api/services/github";
import { withAccessToken } from "./../../../api/helpers";

import { VercelRequest, VercelResponse } from "@vercel/node";
import logger from "services/logger/logger";

export default withAccessToken(
  async (
    request: VercelRequest,
    response: VercelResponse,
    accessToken: string
  ) => {
    if (request.method === "GET") {
      try {
        if (!accessToken) {
          return response.json({
            status: 404,
            message: "Access Token missing in Authorization header",
          });
        }

        const orgs = await fetchOrganizations(accessToken);
        return response.json({
          status: 200,
          orgs,
        });
      } catch (error) {
        logger.error(error.message);
        return response.json({
          status: 500,
          error: error.message,
        });
      }
    }
  }
);
