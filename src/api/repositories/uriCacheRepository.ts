import UriCache from "../entities/uriCache";

import { EntityRepository, ILike, Repository } from "typeorm";

@EntityRepository(UriCache)
export default class UriCacheRepository extends Repository<UriCache> {
  public findUrisByIpfsHash(ipfs: string): Promise<UriCache[]> {
    return this.find({
      where: {
        ipfs: ILike(ipfs),
      },
    });
  }

  public async add(uri: string, ipfs: string): Promise<void> {
    await this.save({
      uri,
      ipfs,
    });
  }

  public findByUri(uri: string): Promise<UriCache> {
    return this.findOne({
      where: {
        uri: ILike(uri),
      },
    });
  }
}
