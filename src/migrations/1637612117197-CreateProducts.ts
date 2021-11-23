import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateProducts1637612117197 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "produtos",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true
                },
                {
                    name: "name",
                    type: "varchar"
                },
                {
                    name: "thumbnail",
                    type: "varchar"
                },
                {
                    name: "price",
                    type: "decimal"
                },
                {
                    name: "created_at",
                    type: "timestamp with time zone",
                    default: "now()"
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("products")
    }

}
