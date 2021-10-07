import Apis from "./apis";
import Users from "./users";

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("starred_apis", { schema: "public" })
export default class StarredApis {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  public id: string;

  @Column("character varying", { name: "fk_api_id" })
  public apiId: string;

  @ManyToOne(() => Apis, (api) => api.starredApis)
  @JoinColumn([{ name: "fk_api_id", referencedColumnName: "id" }])
  public api: Partial<Apis>;

  @Column("character varying", { name: "fk_user_id" })
  public userId: string;

  @ManyToOne(() => Users, (user) => user.starredApis)
  @JoinColumn([{ name: "fk_user_id", referencedColumnName: "id" }])
  public user: Partial<Users>;
}
