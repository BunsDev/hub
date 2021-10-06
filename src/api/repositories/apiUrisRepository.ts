import ApiUris from "../entities/apiUris";

import { EntityRepository, ILike, Repository } from "typeorm";

@EntityRepository(ApiUris)
export default class ApiUrisRepository extends Repository<ApiUris> {
  public async add(
    uri: string,
    apiId: string,
    uriTypeId: number | string
  ): Promise<ApiUris> {
    return this.save({
      uri,
      apiId,
      uriTypeId: uriTypeId.toString(),
    });
  }

  public findByUri(uri: string): Promise<ApiUris> {
    return this.findOne({
      where: {
        uri: ILike(uri),
      },
    });
  }
}
