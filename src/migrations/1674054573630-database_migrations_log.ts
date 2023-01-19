import { MigrationInterface, QueryRunner } from "typeorm";
import * as utils from "../infrastructures/utils";

export class databaseMigrationsLog1674054573630 implements MigrationInterface {
  name = "databaseMigrationsLog1674054573630";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS \`authorities\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`status\` varchar(20) NOT NULL DEFAULT 'PENDING', \`created_by\` varchar(255) NOT NULL, \`created_on\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`last_modified_by\` varchar(255) NOT NULL, \`last_modified_on\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`is_admin\` tinyint NOT NULL DEFAULT 0, \`name\` varchar(255) NOT NULL, \`code\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS \`role_authorities\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`status\` varchar(20) NOT NULL DEFAULT 'PENDING', \`created_by\` varchar(255) NOT NULL, \`created_on\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`last_modified_by\` varchar(255) NOT NULL, \`last_modified_on\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`role_id\` bigint NOT NULL, \`authority_id\` bigint NOT NULL, PRIMARY KEY (\`id\`, \`authority_id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS \`roles\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`status\` varchar(20) NOT NULL DEFAULT 'PENDING', \`created_by\` varchar(255) NOT NULL, \`created_on\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`last_modified_by\` varchar(255) NOT NULL, \`last_modified_on\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`is_super\` tinyint NOT NULL DEFAULT 0, \`oauth_tutor_id\` bigint NOT NULL, UNIQUE INDEX \`UQ_tutor_role\` (\`oauth_tutor_id\`, \`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS \`sector\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`status\` varchar(20) NOT NULL DEFAULT 'PENDING', \`created_by\` varchar(255) NOT NULL, \`created_on\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`last_modified_by\` varchar(255) NOT NULL, \`last_modified_on\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`code\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_6f86c8dca9dc64884a1feecfda\` (\`code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS \`students\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`status\` varchar(20) NOT NULL DEFAULT 'PENDING', \`created_by\` varchar(255) NOT NULL, \`created_on\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`last_modified_by\` varchar(255) NOT NULL, \`last_modified_on\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`student_id\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`bio\` longtext NULL, \`user_id\` bigint NOT NULL, UNIQUE INDEX \`IDX_ba36f3e3743f80d1cdc5102010\` (\`student_id\`), UNIQUE INDEX \`REL_fb3eff90b11bddf7285f9b4e28\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS \`users\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`status\` varchar(20) NOT NULL DEFAULT 'PENDING', \`created_by\` varchar(255) NOT NULL, \`created_on\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`last_modified_by\` varchar(255) NOT NULL, \`last_modified_on\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`email\` varchar(255) NOT NULL, \`is_email_verified\` tinyint NOT NULL DEFAULT 0, \`username\` varchar(255) NOT NULL, \`first_name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`phone_number\` varchar(25) NULL, \`is_phone_number_verified\` tinyint NOT NULL DEFAULT 0, \`image_url\` text NULL, \`password_hash\` varchar(255) NOT NULL, \`two_factor_enabled\` tinyint NOT NULL DEFAULT 0, \`is_primary\` tinyint NOT NULL DEFAULT 0, \`failed_login_attempts\` int(4) NOT NULL DEFAULT '0', \`sector_id\` bigint NOT NULL, UNIQUE INDEX \`UQ_email_username\` (\`email\`, \`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS \`oauth_tutors\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`status\` varchar(20) NOT NULL DEFAULT 'PENDING', \`created_by\` varchar(255) NOT NULL, \`created_on\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`last_modified_by\` varchar(255) NOT NULL, \`last_modified_on\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`oauth_id\` varchar(255) NULL, \`name\` varchar(255) NOT NULL, \`sector_id\` bigint NOT NULL, UNIQUE INDEX \`IDX_a76e68d99541b807ef4c5bf8ab\` (\`oauth_id\`), UNIQUE INDEX \`IDX_bedb2d10ecac33231e0806a23e\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS \`user_roles\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`status\` varchar(20) NOT NULL DEFAULT 'ACTIVE', \`created_by\` varchar(255) NOT NULL DEFAULT 'SYSTEM', \`created_on\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`last_modified_by\` varchar(255) NOT NULL DEFAULT 'SYSTEM', \`last_modified_on\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`user_id\` bigint NOT NULL, \`role_id\` bigint NOT NULL, INDEX \`IDX_87b8888186ca9769c960e92687\` (\`user_id\`), INDEX \`IDX_b23c65e50a758245a33ee35fda\` (\`role_id\`), PRIMARY KEY (\`id\`, \`role_id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS \`oauth_tutor_users\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`status\` varchar(20) NOT NULL DEFAULT 'ACTIVE', \`created_by\` varchar(255) NOT NULL DEFAULT 'SYSTEM', \`created_on\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`last_modified_by\` varchar(255) NOT NULL DEFAULT 'SYSTEM', \`last_modified_on\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`oauth_tutor_id\` bigint NOT NULL, \`user_id\` bigint NOT NULL, INDEX \`IDX_7309791aaa3d74e5581a357a9b\` (\`oauth_tutor_id\`), INDEX \`IDX_c3201f1fca2451981038de89cc\` (\`user_id\`), PRIMARY KEY (\`id\`, \`user_id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `ALTER TABLE \`role_authorities\` ADD CONSTRAINT \`FK_3eca90310205a9d63bf3c5ba2a0\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`)`
    );
    await queryRunner.query(
      `ALTER TABLE \`role_authorities\` ADD CONSTRAINT \`FK_954cf6503d4d88754ff993a0456\` FOREIGN KEY (\`authority_id\`) REFERENCES \`authorities\`(\`id\`)`
    );
    await queryRunner.query(
      `ALTER TABLE \`roles\` ADD CONSTRAINT \`FK_5129d075233f042c4607e2eaa10\` FOREIGN KEY (\`oauth_tutor_id\`) REFERENCES \`oauth_tutors\`(\`id\`)`
    );
    await queryRunner.query(
      `ALTER TABLE \`students\` ADD CONSTRAINT \`FK_fb3eff90b11bddf7285f9b4e281\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`)`
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD CONSTRAINT \`FK_98c79f3071f838004cb466e9bd4\` FOREIGN KEY (\`sector_id\`) REFERENCES \`sector\`(\`id\`)`
    );
    await queryRunner.query(
      `ALTER TABLE \`oauth_tutors\` ADD CONSTRAINT \`FK_cfab3ec480869d9e9791769f5f1\` FOREIGN KEY (\`sector_id\`) REFERENCES \`sector\`(\`id\`)`
    );
    await queryRunner.query(
      `ALTER TABLE \`user_roles\` ADD CONSTRAINT \`FK_87b8888186ca9769c960e926870\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`)`
    );
    await queryRunner.query(
      `ALTER TABLE \`user_roles\` ADD CONSTRAINT \`FK_b23c65e50a758245a33ee35fda1\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`)`
    );
    await queryRunner.query(
      `ALTER TABLE \`oauth_tutor_users\` ADD CONSTRAINT \`FK_7309791aaa3d74e5581a357a9b8\` FOREIGN KEY (\`oauth_tutor_id\`) REFERENCES \`oauth_tutors\`(\`id\`)`
    );
    await queryRunner.query(
      `ALTER TABLE \`oauth_tutor_users\` ADD CONSTRAINT \`FK_c3201f1fca2451981038de89cce\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`)`
    );

    await queryRunner.query(
      `CREATE TRIGGER oauth_tutors_BEFORE_INSERT BEFORE INSERT ON oauth_tutors FOR EACH ROW \n
                        BEGIN\n
                            IF new.oauth_id IS NULL THEN\n
                                SET new.oauth_id = uuid(); \n
                            END IF; \n
                        END;
                    `
    );

    await queryRunner.query(
      `INSERT INTO \`sector\` VALUES
                    (NULL, 'ACTIVE', 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, 'LMS_SUPER ADMINISTRATOR', 'LMS_Super Administrator'),
                    (NULL, 'ACTIVE', 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, 'TUTOR ADMINISTRATOR', 'Tutor Administrator'),
                    (NULL, 'ACTIVE', 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, 'STUDENT' , 'Student');`
    );

    await queryRunner.query(
      `INSERT INTO \`oauth_tutors\` VALUES
                      (NULL, 'ACTIVE', 'SYSTEM', CURRENT_TIMESTAMP,'SYSTEM', CURRENT_TIMESTAMP,'c698455d-20fe-413e-bedb-5fb383da549b', 'LMS Backoffice Web App', '1' ),
                      (NULL, 'ACTIVE', 'SYSTEM', CURRENT_TIMESTAMP,'SYSTEM', CURRENT_TIMESTAMP,'af252eb0b0d24c61b2d7ec82b17ce12a', 'LMS Tutor Web App',  '2' ),
                      (NULL, 'ACTIVE', 'SYSTEM', CURRENT_TIMESTAMP,'SYSTEM', CURRENT_TIMESTAMP,'ecbc9048401d48a79b7ad280de0ee339', 'LMS Student Web App', '3' );
                    `
    );

    await queryRunner.query(
      `INSERT INTO \`roles\` VALUES
                      (NULL, 'ACTIVE', 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, 'Super Administrator', 'Full Access', '1', '1'),
                      (NULL, 'ACTIVE', 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, 'Tutor Administrator', 'Tutor Access', '0', '2'),
                      (NULL, 'ACTIVE', 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, 'Student', 'Student', '0', '3');
                    `
    );

    await queryRunner.query(
      `INSERT INTO \`authorities\` VALUES
                    (NULL, 'ACTIVE', 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, '1', 'Update Students', 'UPDATE_STUDENTS'),
                    (NULL, 'ACTIVE', 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, '1', 'Add Students', 'ADD_STUDENTS'),
                    (NULL, 'ACTIVE', 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, '1', 'Add Tutors', 'ADD_TUTORS'),
                    (NULL, 'ACTIVE', 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, '1', 'View Tutors', 'VIEW_TUTORS'),
                    (NULL, 'ACTIVE', 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, '1', 'Update Tutors','UPDATE_TUTORS'),
                    (NULL, 'ACTIVE', 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, '0', 'Add Roles', 'ADD_ROLES'),
                    (NULL, 'ACTIVE', 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, '0', 'View Roles', 'VIEW_ROLES'),
                    (NULL, 'ACTIVE', 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, '0', 'Update Roles', 'UPDATE_ROLES'),
                    (NULL, 'ACTIVE', 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, '0', 'Add Courses', 'ADD_COURSES'),
                    (NULL, 'ACTIVE', 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, '0', 'View Courses', 'VIEW_COURSES'),
                    (NULL, 'ACTIVE', 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, '0', 'Update Courses', 'UPDATE_COURSES'),
                    (NULL, 'ACTIVE', 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, '0', 'Add Assessments', 'ADD_ASSESSMENTS'),
                    (NULL, 'ACTIVE', 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, '0', 'View Assessments', 'VIEW_ASSESSMENTS'),
                    (NULL, 'ACTIVE', 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, '0', 'Update Assessments','UPDATE_ASSESSMENTS'),
                    (NULL, 'ACTIVE', 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, '1', 'Add Enrollments', 'ADD_ENROLLMENTS'),
                    (NULL, 'ACTIVE', 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, '0', 'View Enrollments', 'VIEW_ENROLLMENTS'),
                    (NULL, 'ACTIVE', 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, '1', 'Update Enrollments', 'UPDATE_ENROLLMENTS')`
    );

    await queryRunner.query(
      `INSERT INTO \`role_authorities\` VALUES
                  (NULL, 'ACTIVE', 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, '1', '1'),
                  (NULL, 'ACTIVE', 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, '1', '2'),
                  (NULL, 'ACTIVE', 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, '1', '3'),
                  (NULL, 'ACTIVE', 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, '1', '4'),
                  (NULL, 'ACTIVE', 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, '1', '5'),
                  (NULL, 'ACTIVE', 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, '1', '6'),
                  (NULL, 'ACTIVE', 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, '1', '7'),
                  (NULL, 'ACTIVE', 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, '1', '8'),
                  (NULL, 'ACTIVE', 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, '1', '9'),
                  (NULL, 'ACTIVE', 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, '1', '10'),
                  (NULL, 'ACTIVE', 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, '1', '11'),
                  (NULL, 'ACTIVE', 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, '1', '12'),
                  (NULL, 'ACTIVE', 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, '1', '13'),
                  (NULL, 'ACTIVE', 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, '1', '14'),
                  (NULL, 'ACTIVE', 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, '1', '15'),
                  (NULL, 'ACTIVE', 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, '1', '16'),
                  (NULL, 'ACTIVE', 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, '1', '17')`
    );

    await queryRunner.query(
      `INSERT INTO \`users\`
                  (\`status\`, \`created_by\`, \`created_on\`, \`last_modified_by\`, \`last_modified_on\`, \`email\`, \`is_email_verified\`, \`username\`, \`first_name\`,
                  \`last_name\`, \`password_hash\`, \`two_factor_enabled\`, \`is_primary\`, \`failed_login_attempts\`, \`sector_id\`)
                  VALUES ('ACTIVE', 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, 'destinyerhabor6@gmail.com', '1', 'destinyerhabor6@gmail.com', 'Caesarsage', 'Administrator', 
                  '${await utils.hashString("changeme")}',
                  '0', '1', '0', '1')`
    );

    await queryRunner.query(
      `INSERT INTO \`user_roles\` VALUES
                  (NULL, 'ACTIVE', 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, '1', '1')`
    );

    await queryRunner.query(
      `INSERT INTO \`oauth_tutor_users\` VALUES
                  (NULL, 'ACTIVE', 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, '1', '1')`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`oauth_tutor_users\` DROP FOREIGN KEY \`FK_c3201f1fca2451981038de89cce\``
    );
    await queryRunner.query(
      `ALTER TABLE \`oauth_tutor_users\` DROP FOREIGN KEY \`FK_7309791aaa3d74e5581a357a9b8\``
    );
    await queryRunner.query(
      `ALTER TABLE \`user_roles\` DROP FOREIGN KEY \`FK_b23c65e50a758245a33ee35fda1\``
    );
    await queryRunner.query(
      `ALTER TABLE \`user_roles\` DROP FOREIGN KEY \`FK_87b8888186ca9769c960e926870\``
    );
    await queryRunner.query(
      `ALTER TABLE \`oauth_tutors\` DROP FOREIGN KEY \`FK_cfab3ec480869d9e9791769f5f1\``
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_98c79f3071f838004cb466e9bd4\``
    );
    await queryRunner.query(
      `ALTER TABLE \`students\` DROP FOREIGN KEY \`FK_fb3eff90b11bddf7285f9b4e281\``
    );
    await queryRunner.query(
      `ALTER TABLE \`roles\` DROP FOREIGN KEY \`FK_5129d075233f042c4607e2eaa10\``
    );
    await queryRunner.query(
      `ALTER TABLE \`role_authorities\` DROP FOREIGN KEY \`FK_954cf6503d4d88754ff993a0456\``
    );
    await queryRunner.query(
      `ALTER TABLE \`role_authorities\` DROP FOREIGN KEY \`FK_3eca90310205a9d63bf3c5ba2a0\``
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_c3201f1fca2451981038de89cc\` ON \`oauth_tutor_users\``
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_7309791aaa3d74e5581a357a9b\` ON \`oauth_tutor_users\``
    );
    await queryRunner.query(`DROP TABLE \`oauth_tutor_users\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_b23c65e50a758245a33ee35fda\` ON \`user_roles\``
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_87b8888186ca9769c960e92687\` ON \`user_roles\``
    );
    await queryRunner.query(`DROP TABLE \`user_roles\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_bedb2d10ecac33231e0806a23e\` ON \`oauth_tutors\``
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_a76e68d99541b807ef4c5bf8ab\` ON \`oauth_tutors\``
    );
    await queryRunner.query(`DROP TABLE \`oauth_tutors\``);
    await queryRunner.query(`DROP INDEX \`UQ_email_username\` ON \`users\``);
    await queryRunner.query(`DROP TABLE \`users\``);
    await queryRunner.query(
      `DROP INDEX \`REL_fb3eff90b11bddf7285f9b4e28\` ON \`students\``
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_ba36f3e3743f80d1cdc5102010\` ON \`students\``
    );
    await queryRunner.query(`DROP TABLE \`students\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_6f86c8dca9dc64884a1feecfda\` ON \`sector\``
    );
    await queryRunner.query(`DROP TABLE \`sector\``);
    await queryRunner.query(`DROP INDEX \`UQ_tutor_role\` ON \`roles\``);
    await queryRunner.query(`DROP TABLE \`roles\``);
    await queryRunner.query(`DROP TABLE \`role_authorities\``);
    await queryRunner.query(`DROP TABLE \`authorities\``);
  }
}
