import {MigrationInterface, QueryRunner} from "typeorm";

export class ApiWithoutOwner1632979888611 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE public.apis ALTER COLUMN fk_owner_id DROP NOT NULL;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE public.apis ALTER COLUMN fk_owner_id SET NOT NULL;`);
    }

}
