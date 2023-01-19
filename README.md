await queryRunner.query(
      `CREATE TRIGGER oauth_tutors_BEFORE_INSERT BEFORE INSERT ON oauth_tutors FOR EACH ROW \n
                  BEGIN\n
                      IF new.oauth_id IS NULL THEN\n
                          SET new.oauth_id = uuid(); \n
                      END IF; \n
                  END;
              `,
    );

    await queryRunner.query(
      `INSERT INTO \`sector\` VALUES
              (NULL, 'ACTIVE', 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, 'LMS_SUPER ADMINISTRATOR', 'LMS_Super Administrator'),
              (NULL, 'ACTIVE', 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, 'TUTOR ADMINISTRATOR', 'Tutor Administrator'),
              (NULL, 'ACTIVE', 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, 'STUDENT' , 'Student');`,
    );

    await queryRunner.query(
      `INSERT INTO \`oauth_tutors\` VALUES
                (NULL, 'ACTIVE', 'SYSTEM', CURRENT_TIMESTAMP,'SYSTEM', CURRENT_TIMESTAMP,'c698455d-20fe-413e-bedb-5fb383da549b', 'LMS Backoffice Web App', '1' ),
                (NULL, 'ACTIVE', 'SYSTEM', CURRENT_TIMESTAMP,'SYSTEM', CURRENT_TIMESTAMP,'af252eb0b0d24c61b2d7ec82b17ce12a', 'LMS Tutor Web App',  '2' ),
                (NULL, 'ACTIVE', 'SYSTEM', CURRENT_TIMESTAMP,'SYSTEM', CURRENT_TIMESTAMP,'ecbc9048401d48a79b7ad280de0ee339', 'LMS Student Web App', '3' );
              `,
    );

    await queryRunner.query(
      `INSERT INTO \`roles\` VALUES
                (NULL, 'ACTIVE', 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, 'Super Administrator', 'Full Access', '1', '1'),
                (NULL, 'ACTIVE', 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, 'Tutor Administrator', 'Tutor Access', '0', '2'),
                (NULL, 'ACTIVE', 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, 'Student', 'Student', '0', '3');
              `,
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
              (NULL, 'ACTIVE', 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, '1', 'Update Enrollments', 'UPDATE_ENROLLMENTS')`,
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
            (NULL, 'ACTIVE', 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, '1', '17')`,
    );

    await queryRunner.query(
      `INSERT INTO \`users\`
            (\`status\`, \`created_by\`, \`created_on\`, \`last_modified_by\`, \`last_modified_on\`, \`email\`, \`is_email_verified\`, \`username\`, \`first_name\`,
            \`last_name\`, \`password_hash\`, \`two_factor_enabled\`, \`is_primary\`, \`failed_login_attempts\`, \`sector_id\`)
            VALUES ('ACTIVE', 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, 'destinyerhabor6@gmail.com', '1', 'destinyerhabor6@gmail.com', 'Caesarsage', 'Administrator', 
            '${await utils.hashString('changeme')}',
            '0', '1', '0', '1')`,
    );

    await queryRunner.query(
      `INSERT INTO \`user_roles\` VALUES
            (NULL, 'ACTIVE', 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, '1', '1')`,
    );

    await queryRunner.query(
      `INSERT INTO \`oauth_tutor_users\` VALUES
            (NULL, 'ACTIVE', 'SYSTEM', CURRENT_TIMESTAMP, 'SYSTEM', CURRENT_TIMESTAMP, '1', '1')`,
    );