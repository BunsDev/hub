import Apis from "../entities/apis";
import { ApiData } from "../models/types";
import { Api } from "../models/Api";

import { EntityRepository, Repository } from "typeorm";

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

  public async search(limit = 10, page = 1, search?: string): Promise<Apis[]> {
    const query = this.createQueryBuilder("apis")
      .where("visible = true")
      .leftJoinAndSelect("apis.apiUris", "apiUris")
      .loadRelationCountAndMap("apis.favorites", "apis.starredApis")
      .take(limit)
      .skip((page - 1) * limit)
      .orderBy("apis.id", "DESC");

    if (search && search.length > 2) {
      query.where(
        "(apis.name ILIKE :search or apis.description ILIKE :search or apis.subtext ILIKE :search or apiUris.uri ILIKE :search)",
        { search: `%${search}%` }
      );
    }

    return query.getMany();
  }

  // TODO: deprecated
  public async getAllActive(): Promise<ApiData[]> {
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
			WHERE visible = true
			GROUP BY apis.id, uri_types.type, api_uris.uri`
    );

    return data.reduce(Api.sanitizeApis, []);
  }

  public async deactivate(id: number) {
    return this.update(id, {
      visible: false,
    });
  }
}
