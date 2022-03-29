import { withValidatePublishBody } from "../../../api/helpers";
import { ApiData } from "../../../api/models/types";
import Database from "../db";
import ApiRepository from "../../../api/repositories/api";
import ApiUrisRepository from "../../../api/repositories/apiUrisRepository";

import { getCustomRepository } from "typeorm";
import { VercelRequest, VercelResponse } from "@vercel/node";
import { API_URI_TYPE_ID } from "src/constants";
import logger from "services/logger/logger";

const md5 = require("md5"); // eslint-disable-line

export default withValidatePublishBody(
  async (request: VercelRequest, response: VercelResponse) => {
    if (request.method === "POST") {
      try {
        // User will send id from ceramic
        // We will hash it and check that the user exists

        const apiInfo: ApiData = {
          ...request.body,
        };

        if (request.body.did) {
          apiInfo.ownerId = md5(request.body.did);
        }
        console.log("apiInfo", apiInfo);

        //locationUri => ipfsHash
        const { locationUri } = apiInfo;

        /*
        // @TODO: Remove checkContentIsValid method
        // and use Web3Api Client instead
         const { valid, message } = await checkContentIsValid(
          apiUris,
          locationUri
        ); 
        */

        const database = new Database();
        await database.connect();

        const apiRepository = await getCustomRepository(ApiRepository);
        const apiUrisRepository = await getCustomRepository(ApiUrisRepository);
        const existingApi = await apiUrisRepository.findByUri(locationUri);

        if (existingApi) {
          return response.json({ status: 409, existingApi, ok: false });
        }
        const api = await apiRepository.add(
          apiInfo.name,
          apiInfo.subtext,
          apiInfo.description,
          apiInfo.icon,
          apiInfo.ownerId
        );

        console.log("api", api);
        const uri = await apiUrisRepository.add(
          locationUri,
          api.id,
          API_URI_TYPE_ID.ipfs
        );
        console.log("uri", uri);

        if (apiInfo.apiUris?.length) {
          for (const uri of apiInfo.apiUris) {
            console.log("for", uri);
            // @TODO: Authority #2 is IPFS - Change uri id type check logic
            //const uriTypeId = uri.includes(".") ? 1 : 2;
            await apiUrisRepository.add(uri, api.id, API_URI_TYPE_ID.ens);
          }
        }

        return response.json({ status: 200, api });

        /*    return response.json({
          status: 406,
          error: message,
        }); */
      } catch (error) {
        logger.error(error.message);
        response.json({ status: 500, error: error.message });
      }
    }
  }
);
