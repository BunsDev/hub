import Organizations from "./organizations";
import Users from "./users";
import StarredApis from "./starredApis";
import ApiUris from "./apiUris";

import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Index("apis_pkey", ["id"], { unique: true })
@Entity("apis", { schema: "public" })
export default class Apis {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  public id: string;

  @Column("character varying", { name: "name" })
  public name: string;

  @Column("character varying", { name: "description" })
  public description: string;

  @Column("character varying", { name: "subtext" })
  public subtext: string;

  @Column("character varying", { name: "icon" })
  public icon: string;

  @Column("boolean", { name: "visible", nullable: true, default: () => "true" })
  public visible: boolean | null;

  @ManyToOne(() => Organizations, (organization) => organization.apis)
  @JoinColumn([{ name: "fk_organization_id", referencedColumnName: "id" }])
  public organization: Partial<Organizations>;

  @Column("character varying", { name: "fk_owner_id", nullable: true })
  public ownerId: string | null;

  @ManyToOne(() => Users, (user) => user.apis)
  @JoinColumn([{ name: "fk_owner_id", referencedColumnName: "id" }])
  public owner: Partial<Users> | null;

  @OneToMany(() => StarredApis, (starredApi) => starredApi.api)
  public starredApis: Partial<StarredApis>[];

  @OneToMany(() => ApiUris, (apiUris) => apiUris.api)
  public apiUris: Partial<ApiUris>[];
}
