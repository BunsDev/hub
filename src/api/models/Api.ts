import { ApiData } from "./types";

import { getConnection } from "typeorm";

export enum Authorities {
  ENS = 1,
  IPFS,
}

export class Api {
  public static async create(_: ApiData) {
    // const {
    //   name,
    //   subtext,
    //   description,
    //   icon,
    //   locationUri,
    //   pointerUris,
    //   ownerId,
    // } = apiInfo
    // const insertApi = async (tx: any) => {
    //   const api = await tx.one(
    //     'INSERT INTO apis (name, subtext, description, icon, fk_owner_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    //     [name, subtext, description, icon, ownerId],
    //   )
    //   //@TODO: Retrieve authId dynamically
    //   await tx.none(
    //     'INSERT INTO api_uris (uri, fk_api_id, fk_uri_type_id) VALUES ($1, $2, $3)',
    //     [locationUri, api.id, Authorities.IPFS],
    //   )
    //   const insertPointers = async (locationUri: string) => {
    //     await tx.none(
    //       'INSERT INTO api_uris (uri, fk_api_id, fk_uri_type_id) VALUES ($1, $2, $3)',
    //       [locationUri, api.id, Authorities.ENS],
    //     )
    //   }
    //   pointerUris.map(insertPointers)
    // }
    // await connection.tx(insertApi)
    // return {
    //   name,
    //   subtext,
    //   description,
    //   icon,
    //   locationUri,
    //   pointerUris,
    // }
  }

  public static async getByLocation(location: string, name: string) {
    const api = await getConnection()
      .createQueryRunner()
      .query(
        `SELECT apis.id FROM apis
        INNER JOIN api_uris ON apis.id = api_uris.fk_api_id
        INNER JOIN uri_types ON uri_types.id = api_uris.fk_uri_type_id
        WHERE api_uris.uri = $1 AND LOWER(uri_types.name) = $2`,
        [name, location]
      );

    if (!api) {
      return null;
    }

    return await getConnection()
      .createQueryRunner()
      .query(
        `SELECT
          apis.id,
          apis.description,
          apis.name,
          apis.subtext,
          apis.icon,
          uri_types.type as type,
          api_uris.uri,
          COUNT(starred_apis.fk_api_id) as favorites
        FROM apis
        INNER JOIN api_uris ON apis.id = api_uris.fk_api_id 
        INNER JOIN uri_types ON uri_types.id = api_uris.fk_uri_type_id 
        FULL OUTER JOIN starred_apis ON apis.id = starred_apis.fk_api_id
        WHERE api_uris.fk_api_id = $1
        GROUP BY apis.id, uri_types.type, api_uris.uri`,
        [api[0].id]
      );
  }

  public static async getFavorites(apiId: string) {
    return await getConnection()
      .createQueryRunner()
      .query(
        `SELECT apis.id, 
        apis.description, 
        apis.name, 
        apis.subtext,
        apis.icon, 
        uri_types.type as type, 
        api_uris.uri FROM apis 
        INNER JOIN api_uris ON apis.id = api_uris.fk_api_id 
        INNER JOIN uri_types ON uri_types.id = api_uris.fk_uri_type_id 
        INNER JOIN starred_apis ON apis.id = starred_apis.fk_api_id
        WHERE starred_apis.fk_api_id = $1`,
        [apiId]
      );
  }

  public static async getFavoritesByUserId(userId: string) {
    const data = await getConnection()
      .createQueryRunner()
      .query(
        `SELECT apis.id,
      apis.description,
      apis.name,
      apis.subtext,
      apis.icon,
      uri_types.type as type,
      api_uris.uri,
      COUNT(starred_apis.fk_api_id) as favorites
      FROM apis
      FULL OUTER JOIN starred_apis on apis.id = starred_apis.fk_api_id
      INNER JOIN api_uris ON apis.id = api_uris.fk_api_id
      INNER JOIN uri_types ON uri_types.id = api_uris.fk_uri_type_id
      WHERE starred_apis.fk_user_id = $1
      GROUP BY apis.id, uri_types.type, api_uris.uri`,
        [userId]
      );

    return data.reduce(Api.sanitizeApis, []);
  }

  public static async getPublishedApis(userId: string) {
    const data = await getConnection()
      .createQueryRunner()
      .query(
        `SELECT apis.id,
        apis.description,
        apis.name,
        apis.subtext,
        apis.icon,
        uri_types.type as type,
        api_uris.uri,
        COUNT(starred_apis.fk_api_id) as favorites
      FROM apis
      INNER JOIN api_uris ON apis.id = api_uris.fk_api_id
      INNER JOIN uri_types ON uri_types.id = api_uris.fk_uri_type_id
      FULL OUTER JOIN starred_apis ON apis.id = starred_apis.fk_api_id
      WHERE apis.fk_owner_id = $1
      GROUP BY apis.id, uri_types.type, api_uris.uri`,
        [userId]
      );

    return data.reduce(Api.sanitizeApis, []);
  }

  public static sanitizeApis(acc: ApiData[], api: any): ApiData[] { // eslint-disable-line
    const { authority, type, uri, name, ...metadata } = api; // eslint-disable-line

    const apiIndex = acc.findIndex(({ name }) => name === api.name);

    const apiSanitized = {
      ...metadata,
      name,
      pointerUris: [],
      ...(acc[apiIndex] || {}),
    };

    if (api.type === "storage") {
      apiSanitized.locationUri = api.uri;
    } else {
      apiSanitized.pointerUris.push(api.uri);
    }

    if (apiIndex === -1) return [...acc, apiSanitized];
    acc[apiIndex] = apiSanitized;

    return acc;
  }
}
