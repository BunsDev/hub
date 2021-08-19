import { Column, Entity, Index, OneToMany } from "typeorm";
import Apis from "./apis";
import StarredApis from "./starredApis";
import UserOrganizations from "./userOrganizations";

@Index("users_pkey", ["id"], { unique: true })
@Entity("users", { schema: "public" })
export default class Users {
  @Column("character varying", { primary: true, name: "id" })
  public id: string;

  @OneToMany(() => Apis, (apis) => apis.fkOwner)
  public apis: Apis[];

  @OneToMany(() => StarredApis, (starredApis) => starredApis.fkUser)
  public starredApis: StarredApis[];

  @OneToMany(
    () => UserOrganizations,
    (userOrganizations) => userOrganizations.fkUser
  )
  public userOrganizations: UserOrganizations[];
}
