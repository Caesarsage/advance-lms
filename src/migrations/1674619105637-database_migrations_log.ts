import { MigrationInterface, QueryRunner } from "typeorm";
import * as utils from "../infrastructures/utils";

export class databaseMigrationsLog1674619105637 implements MigrationInterface {
    name = 'databaseMigrationsLog1674619105637'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`oauth_tutors\` ADD \`encrypted_oauth_secret\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`oauth_tutors\` ADD \`hashed_oauth_secret\` varchar(255) NOT NULL`);

        await queryRunner.query(
            `UPDATE \`oauth_tutors\` SET encrypted_oauth_secret = '${await utils.encryptString('47a4f45751fd4c05ab3227975412c4d4')}',
                hashed_oauth_secret = '${await utils.hashString('47a4f45751fd4c05ab3227975412c4d4')}' WHERE id = 1
            `,
        );
        await queryRunner.query(
            `UPDATE \`oauth_tutors\` SET encrypted_oauth_secret = '${await utils.encryptString('af252eb0b0d24c61b2d7ec82b17ce12a')}',
                hashed_oauth_secret = '${await utils.hashString('af252eb0b0d24c61b2d7ec82b17ce12a')}' WHERE id = 2
            `,
        );

        await queryRunner.query(
            `UPDATE \`oauth_tutors\` SET encrypted_oauth_secret = '${await utils.encryptString('ecbc9048401d48a79b7ad280de0ee339')}',
                hashed_oauth_secret = '${await utils.hashString('ecbc9048401d48a79b7ad280de0ee339')}' WHERE id = 3
            `,
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`oauth_tutors\` DROP COLUMN \`hashed_oauth_secret\``);
        await queryRunner.query(`ALTER TABLE \`oauth_tutors\` DROP COLUMN \`encrypted_oauth_secret\``);
    }

}
