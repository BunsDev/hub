import Organizations from "../entities/organizations";

import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Organizations)
export default class OrganizationRepository extends Repository<Organizations> {
  public getById(id: number): Promise<Organizations> {
    return this.findOne({
      where: {
        id,
      },
    });
  }
}
