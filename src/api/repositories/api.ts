import Apis from "../entities/apis";
import sanitizeApis, { attachLocationUri } from "utils/sanitizeApis";

import { EntityRepository, Repository } from "typeorm";
import { APIData } from "hooks/ens/useGetAPIfromENS";

@EntityRepository(Apis)
export default class ApiRepository extends Repository<Apis> {
  public add(
    name: string,
    subtext: string,
    description: string,
    icon: string,
    ownerId?: string
  ): Promise<Apis | undefined> {
    return this.save({
      name,
      subtext,
      description,
      icon,
      ownerId,
    });
  }

  public async updateById(
    id: string,
    name: string,
    subtext: string,
    description: string,
    icon: string,
    ownerId?: string
  ) {
    return this.update(id, {
      name,
      subtext,
      description,
      icon,
      ownerId,
    });
  }

  public findByName(name: string): Promise<Apis | undefined> {
    return this.findOne({
      where: {
        name,
      },
    });
  }

  public async getAllActiveCount(): Promise<number> {
    return this.createQueryBuilder("apis").where("visible = true").getCount();
  }

  public async searchCount(search: string): Promise<number> {
    const query = this.createQueryBuilder("apis")
      .where("visible = true")
      .leftJoinAndSelect("apis.apiUris", "apiUris");

    if (search && search.length > 2) {
      query.where(
        "(apis.name ILIKE :search or apis.description ILIKE :search or apis.subtext ILIKE :search or apiUris.uri ILIKE :search)",
        { search: `%${search}%` }
      );
    }

    return query.getCount();
  }

  // TODO: deprecated
  public async getAllActive(): Promise<APIData[]> {
    const query = this.createQueryBuilder("apis")
      .where("visible = true")
      .leftJoinAndSelect("apis.apiUris", "apiUris")
      .loadRelationCountAndMap("apis.favorites", "apis.starredApis")
      .orderBy("apis.id", "DESC");

    return ((await query.getMany()) as unknown as APIData[]).map(
      attachLocationUri
    );
  }

  public async getActive(
    search = "",
    page: number | string = 1,
    limit: number | string = 12,
    preload?: boolean
  ): Promise<{ apis: APIData[]; totalCount: number }> {
    const query = this.createQueryBuilder("apis")
      .where("visible = true")
      .leftJoinAndSelect("apis.apiUris", "apiUris")
      .loadRelationCountAndMap("apis.favorites", "apis.starredApis")
      .take(preload ? Number(page) * Number(limit) : Number(limit))
      .skip(preload ? 0 : (Number(page) - 1) * Number(limit))
      .orderBy("apis.id", "DESC");

    //@ts-ignore
    if (search && search.length > 2) {
      query.where(
        "(apis.name ILIKE :search or apis.description ILIKE :search or apis.subtext ILIKE :search or apiUris.uri ILIKE :search)",
        { search: `%${search}%` }
      );
    }

    const [apis, total] = await query.getManyAndCount();
    const apisWithLocationUri = (apis as unknown as APIData[])?.map(
      attachLocationUri
    );

    return { apis: apisWithLocationUri, totalCount: total };
  }

  public async deactivate(id: number) {
    return this.update(id, {
      visible: false,
    });
  }
  public async getById(id: string) {
    const api = await this.findOne({ where: { id } });
    return { ...api };
  }
  public async getByLocation(location: string, name: string) {
    const api = await this.query(
      `SELECT apis.id FROM apis
        INNER JOIN api_uris ON apis.id = api_uris.fk_api_id
        INNER JOIN uri_types ON uri_types.id = api_uris.fk_uri_type_id
        WHERE api_uris.uri = $1 AND LOWER(uri_types.name) = $2`,
      [name, location]
    );

    if (!api) {
      return null;
    }

    const data = await this.query(
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

    return data.reduce(sanitizeApis, [])[0];
  }

  public async getFavorites(apiId: string) {
    return await this.query(
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

  public async getFavoritesByUserId(userId: string) {
    const data = await this.query(
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

    return data.reduce(sanitizeApis, []);
  }

  public async getPublishedApis(userId: string) {
    const data = await this.query(
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

    return data.reduce(sanitizeApis, []);
  }
}
