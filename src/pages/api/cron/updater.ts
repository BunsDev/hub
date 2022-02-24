import { Web3ApiClient } from "@web3api/client-js";
import ApiRepository from "../../../api/repositories/api";
import ApiUrisRepository from "../../../api/repositories/apiUrisRepository";
import Database from "../db";
import { getCustomRepository } from "typeorm";
import * as dotenv from "dotenv";
import path from "path";
import ApiUris from "src/api/entities/apiUris";
import cron from "node-cron";
import { API_URI_TYPE_ID } from "src/constants";

try {
  dotenv.config({ path: path.resolve(__dirname) + "/../../../../.env" });
} catch (e) {
  //nop
}

console.log("updater started");

cron.schedule("0 0 */12 * * *", () => {
  console.log("cronJob started");
  updater();
});

export async function updater() {
  console.log("updater run");
  const database = new Database();
  await database.connect();

  const apis = await getApis();
  //console.log("apis", apis);

  const client = new Web3ApiClient();
  const network = "ropsten";
  const apiRepository = await getCustomRepository(ApiRepository);
  const apiUrisRepository = await getCustomRepository(ApiUrisRepository);

  for await (const apiUri of apis) {
    const apiPath = `ens/${network}/${apiUri.uri}`;

    await updateWrapperMeta(client, apiUri, apiPath, apiRepository);
    await updateWrapperIpfsUri(client, apiUri, apiPath, apiUrisRepository);
  }
}

async function updateWrapperMeta(
  client: Web3ApiClient,
  apiUri: ApiUris,
  path: string,
  apiRepository: ApiRepository
) {
  try {
    const metadata = await client.getManifest(path, { type: "meta" });
    const { name, subtext, description, icon } = metadata;
    const newApiData = { name, subtext, description, icon };

    return await apiRepository.update(apiUri.api.id, {
      ...apiUri.api,
      ...newApiData,
    });
  } catch (e) {
    console.log(e);
  }
}

async function updateWrapperIpfsUri(
  client: Web3ApiClient,
  apiUri: ApiUris,
  path: string,
  apiUrisRepository: ApiUrisRepository
) {
  try {
    const resolved = await client.resolveUri(path);

    if (resolved?.uri?.path) {
      let uriIpfs = await apiUrisRepository.findOne({
        where: { apiId: apiUri.apiId, uriTypeId: API_URI_TYPE_ID.ipfs },
      });
      await apiUrisRepository.save({ ...uriIpfs, uri: resolved.uri.path });
    }
  } catch (e) {
    console.log(e);
  }
}

/********************** UTILS ************************/

async function getApis() {
  return await ApiUris.createQueryBuilder("api_uris")
    .innerJoinAndSelect("api_uris.api", "api")
    .where(`api_uris.fk_uri_type_id = :typeId`, { typeId: 1 })
    .limit(2)
    .getMany();
}

