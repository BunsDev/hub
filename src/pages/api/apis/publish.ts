import { checkContentIsValid } from "../../../api/services/ens";
import { withValidatePublishBody } from "../../../api/helpers";
import { ApiData } from "../../../api/models/types";

import { VercelRequest, VercelResponse } from "@vercel/node";
import { getConnection } from "typeorm";
import ApiRepository from "src/api/repositories/api";

const md5 = require("md5"); // eslint-disable-line

export default withValidatePublishBody(
  async (request: VercelRequest, response: VercelResponse) => {
    if (request.method === "POST") {
      try {
        // User will send id from ceramic
        // We will hash it and check that the user exists
        const ownerId = md5(request.body.did);
        const apiInfo: ApiData = {
          ownerId,
          ...request.body,
        };

        const { locationUri, apiUris } = apiInfo;

        // @TODO: Remove checkContentIsValid method
        // and use Web3Api Client instead
        const { valid, message } = await checkContentIsValid(
          apiUris,
          locationUri
        );

        if (valid) {
          const apiRepository =
            getConnection().getCustomRepository(ApiRepository);

          const api = await apiRepository.add(apiInfo);
          return response.json({ status: 200, api });
        }

        return response.json({
          status: 406,
          error: message,
        });
      } catch (error) {
        response.json({ status: 500, error: error.message });
      }
    }
  }
);
