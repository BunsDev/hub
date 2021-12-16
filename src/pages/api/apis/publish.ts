import { withValidatePublishBody } from "../../../api/helpers";
import { ApiData } from "../../../api/models/types";
import Database from "../db";
import ApiRepository from "../../../api/repositories/api";
import ApiUrisRepository from "../../../api/repositories/apiUrisRepository";

import { getCustomRepository } from "typeorm";
import { VercelRequest, VercelResponse } from "@vercel/node";
import { API_URI_TYPE_ID } from "src/constants";

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
        const api = await apiRepository.add(
          apiInfo.name,
          apiInfo.subtext,
          apiInfo.description,
          apiInfo.icon,
          apiInfo.ownerId
        );

        console.log("api", api);
        await apiUrisRepository.add(locationUri, api.id, API_URI_TYPE_ID.ipfs);
        for (const uri of apiInfo?.apiUris) {
          // @TODO: Authority #2 is IPFS - Change uri id type check logic
          //const uriTypeId = uri.includes(".") ? 1 : 2;
          await apiUrisRepository.add(uri, api.id, API_URI_TYPE_ID.ens);
        }

        return response.json({ status: 200, api });

        /*    return response.json({
          status: 406,
          error: message,
        }); */
      } catch (error) {
        response.json({ status: 500, error: error.message });
      }
    }
  }
);
