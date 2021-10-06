import StarredApi from "../entities/starredApis";

import { EntityRepository, Repository } from "typeorm";

@EntityRepository(StarredApi)
export default class StarredApiRepository extends Repository<StarredApi> {
  public getFavoritesCountByUserId(userId: string): Promise<number> {
    return this.count({
      where: {
        userId,
      },
    });
  }

  public getFavoritesByUserId(userId: string): Promise<StarredApi[]> {
    return this.find({
      where: {
        userId,
      },
    });
  }

  public getFavoritesCountByApiId(apiId: string): Promise<number> {
    return this.count({
      where: {
        apiId,
      },
    });
  }

  public getFavoritesByApiId(apiId: string): Promise<StarredApi[]> {
    return this.find({
      where: {
        apiId,
      },
    });
  }

  public async favorite(userId: string, apiId: string): Promise<void> {
    await this.save({
      userId,
      apiId,
    });
  }

  public async unfavorite(userId: string, apiId: string): Promise<void> {
    await this.delete({
      userId,
      apiId,
    });
  }

  public async isFavorite(userId: string, apiId: string): Promise<boolean> {
    const obj = await this.findOne({
      where: {
        userId,
        apiId,
      },
    });

    return !!obj;
  }
}
