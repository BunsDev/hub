import * as dotenv from "dotenv";
import path from "path";
import axios from "axios";
import Database from "../db";
import { getCustomRepository } from "typeorm";
import ApiRepository from "src/api/repositories/api";
import ApiUrisRepository from "src/api/repositories/apiUrisRepository";
import { Web3ApiClient } from "@web3api/client-js";
import { APIData } from "hooks/ens/useGetAPIfromENS";
import getMetaDataFromPackageUri from "services/ipfs/getMetaDataPackageUri";
import { API_URI_TYPE_ID } from "src/constants";
import cron from "node-cron";

try {
  dotenv.config({ path: path.resolve(__dirname) + "/../../../../.env" });
} catch (e) {
  //nop
}

console.log("persistor started");

cron.schedule("0 0 */12 * * *", () => {
  console.log("cronJob started");
  void persistor();
});

axios.interceptors.response.use(
  (response) => {
    switch (response.headers["content-type"]) {
      case "application/json":
        return response;
      case "text/html; charset=utf-8": {
        const regexpIpfs = /\/ipfs\/[a-zA-Z0-9]*/gs;
        const ipfsHashes = String(response.data).match(regexpIpfs); //   ["/ipfs/Qm2..."]
        response.data = ipfsHashes;
        return response;
      }
      default:
        return Promise.reject(response);
    }
  },
  (error) => Promise.reject(error)
);

export async function persistor() {
  const { data: ipfsHashes }: { data: string[] } = await axios.get(
    "https://ipfs.wrappers.io/pin/ls"
  );

  /*  const { data } = await axios.post(
    "https://tracking.wrappers.io/api/ens/node/resolve-many"
  );
  console.log(data) */

  if (ipfsHashes?.length) {
    const database = new Database();
    await database.connect();
    const apiRepository = getCustomRepository(ApiRepository);
    const apiUrisRepository = getCustomRepository(ApiUrisRepository);

    const client = new Web3ApiClient();

    for await (const hash of ipfsHashes) {
      console.log("Hash:", hash);

      const hashOnly = hash.replace("/ipfs/", ""); // "Qm2v..."
      console.log("Hash only", hashOnly);

      const uriInDB = await apiUrisRepository.findOne({
        where: { uri: hashOnly },
      });

      if (uriInDB) {
        console.log(uriInDB.uri, "already in DB, skipping...");
        continue;
      } else {
        const apiData = (await getMetaDataFromPackageUri(
          client,
          hash
        )) as unknown as APIData;
        apiData.locationUri = hash;
        console.log("API Data: ", apiData);

        const savedApi = await apiRepository.add(
          apiData.name,
          apiData?.subtext,
          apiData?.description,
          apiData?.icon
        );
        await apiUrisRepository.add(
          hashOnly,
          savedApi.id,
          API_URI_TYPE_ID.ipfs
        );
        console.log("API saved at id:", savedApi.id);
      }
    }
  }
}

persistor();
