import { withValidatePublishBody } from "../../../api/helpers";
import { ApiData } from "../../../api/models/types";
import Database from "../db";
import ApiRepository from "../../../api/repositories/api";
import ApiUrisRepository from "../../../api/repositories/apiUrisRepository";

import { getCustomRepository } from "typeorm";
import { VercelRequest, VercelResponse } from "@vercel/node";
import { API_URI_TYPE_ID } from "src/constants";
import logger from "services/logger/logger";
import Apis from "src/api/entities/apis";
import { isEns } from "utils/pathResolvers";
import ApiUris from "src/api/entities/apiUris";

const md5 = require("md5"); // eslint-disable-line

const updateApiUris = async (
  apiUrisRepository: ApiUrisRepository,
  api: Apis,
  apiUris: string[]
) => {
  for await (const uri of apiUris) {
    // @TODO: Authority #2 is IPFS - Change uri id type check logic
    //const uriTypeId = uri.includes(".") ? 1 : 2;
    const res = await apiUrisRepository.add(
      uri,
      api.id,
      isEns(uri) ? API_URI_TYPE_ID.ens : API_URI_TYPE_ID.ipfs
    );
  }
};
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

        const existingApiIpfs = await apiUrisRepository.findByUri(locationUri);
        const existingApi = await apiRepository.findOne({
          where: { id: existingApiIpfs?.apiId },
        });

        if (existingApi) {
          if (apiInfo.apiUris?.length) {
            let ensUris: ApiUris[] = [];
            for await (const ens of apiInfo.apiUris) {
              const existingEns = await apiUrisRepository.findOne({
                where: { uri: ens },
              });
              if (existingEns) ensUris.push(existingEns);
              else {
                const addedEns = await apiUrisRepository.add(
                  ens,
                  existingApi.id,
                  API_URI_TYPE_ID.ens
                );
                ensUris.push(addedEns);
              }
            }
            return response.status(409).json({ status: 409, ok: false });
          }

          return response.status(409).json({ status: 409, ok: false });
        }

        const api = await apiRepository.add(
          apiInfo.name,
          apiInfo?.subtext,
          apiInfo?.description,
          apiInfo?.icon,
          apiInfo?.ownerId
        );

        await apiUrisRepository.add(locationUri, api.id, API_URI_TYPE_ID.ipfs);

        if (apiInfo.apiUris?.length) {
          for await (const uri of apiInfo.apiUris) {
            // @TODO: Authority #2 is IPFS - Change uri id type check logic
            //const uriTypeId = uri.includes(".") ? 1 : 2;
            const res = await apiUrisRepository.add(
              uri,
              api.id,
              API_URI_TYPE_ID.ens
            );
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
