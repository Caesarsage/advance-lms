import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { ErrorCode } from "src/infrastructures/enums";
import { EntityStatus } from "src/infrastructures/enums/statatus.enum";
import { LmsAccessException, LmsAuthException, LmsGhostException } from "src/infrastructures/exceptions";
import { OAuthTutor } from "../oauth-tutors/entities/oauth-tutor.entity";
import { OauthTutorsService } from "../oauth-tutors/oauth-tutors.service";
import { RolePermission } from "../roles/entities/role-permission.entity";
import { Role } from "../roles/entities/role.entity";
import { User } from "../users/entities/user.entity";
import { UsersService } from "../users/users.service";
import { LoginDto } from "./dto/login.dto";
import { v4 as uuid } from 'uuid';
import { AppSector } from "src/infrastructures/enums/sector.enum";
import * as utils from '../../infrastructures/utils';

@Injectable()
export class AuthService {
  constructor(
    private oauthTutorService: OauthTutorsService,
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  getAccessToken = async (
    basic_auth: string,
    login_dto: LoginDto
  ) =>{
    const oauth_tutor = await this.validateOAuthTutor(basic_auth);

    switch (login_dto.grant_type) {
      case 'client_credentials':
        return await this.generateAccessToken(oauth_tutor)
    }
  }

  validateOAuthTutor = async (basic_auth: string): Promise<OAuthTutor> => {
    const [tutor_id, client_secret] = this.extractTutorCredentials(basic_auth);
    const oAuthTutor = await this.oauthTutorService.findByOAuthId(tutor_id);
    if (oAuthTutor) {
      if (oAuthTutor.status !== EntityStatus.ACTIVE) {
        throw LmsAccessException.of(ErrorCode.UNAUTHORIZED_CLIENT)
      } else if (
        await utils.compareHash(client_secret, oAuthTutor.hashed_oauth_secret)
      ) {
        return oAuthTutor;
      }
    }

    throw LmsAuthException.of(ErrorCode.INVALID_CLIENT)
  }

  validateUser = async (
    oAuthTutor: OAuthTutor,
    login_dto: LoginDto
  ): Promise<User | null> => {
    const user = await this.userService.findByUsernameAndSectorId(
      login_dto.username,
      oAuthTutor.sector_type.id,
    );

    if (user?.status === EntityStatus.INACTIVE) {
      throw LmsGhostException.of(ErrorCode.USER_INACTIVE)
    }
    if (user?.is_email_verified === false) {
      throw LmsGhostException.of(ErrorCode.USER_EMAIL_NOT_CONFIRMED)
    }

    if (
      user?.status === EntityStatus.ACTIVE &&
      (await utils.compareHash(login_dto.password, user.password_hash))
    ) {
      return user;
    }

    throw LmsAuthException.of(ErrorCode.INVALID_USER_CREDENTIALS)
  }

  generateAccessToken = async (
    oauth_tutor: OAuthTutor,
    authorized_user: User | undefined = undefined
  ) => {
    const scope = 'profile'
    const token_type = 'bearer'

    const tutor_id = oauth_tutor.oauth_id;
    const token_lifetime = 259200;

    let result: any = {
      token_type,
      expires_in: token_lifetime - 1,
      scope,
    }

    let token_payload;
    if (!authorized_user) {
      // Tutor login only...
      token_payload = {
        token_type,
        scope,
        sub: oauth_tutor.id,
        principal: tutor_id,
        tutor_id,
        sector: oauth_tutor.sector_type.code,
        tutor_login: true,
        roles: [],
        authorities: []
      }
    } else {
      const {
        id,
        username,
        first_name,
        last_name,
        email,
        is_email_verified,
        is_phone_number_verified,
        image_url,
        sector_type,
      } = authorized_user;

      const user_type = sector_type.name
      const roles = new Set<string>();
      const authorities = new Set<string>();
      authorized_user.roles?.forEach((role: Role) => {
        if (EntityStatus.ACTIVE === role.status) {
          roles.add(role.name);
          role.role_permissions?.forEach((role_permission: RolePermission) => {
            if (EntityStatus.ACTIVE === role_permission.status) {
              authorities.add(role_permission.permission.code)
            }
          });
        }
      });

      // const security_stamp = uuid()
      // authorized_user.se
      
      token_payload = {
        token_type,
        scope,
        sub: id,
        principal: username,
        user_type,
        username,
        full_name: first_name + ' ' + last_name,
        email,
        is_email_verified,
        is_phone_number_verified,
        tutor_id,
        sector_type: sector_type.code,
        client_login: false,
        roles: Array.from(roles),
        authorities: Array.from(authorities),
      };

      result = {
        ...result,
        username,
        sub: id,
        principal: username,
        first_name,
        last_name,
        phone_number: authorized_user.phone_number,
        email,
        is_email_verified,
        is_phone_number_verified,
        image_url,
        user_type,
        roles: Array.from(roles),
        authorities: Array.from(authorities),
      };

       // Not changing the values of last_modified_by here so that login does not replace the last audited modifier
       await this.userService.saveChanges(
        authorized_user,
        authorized_user.last_modified_by,
      );

      // Additional info for student login
      if (AppSector.STUDENT  === authorized_user.sector_type.code) {
        const student = authorized_user.student
        // result.onboarding_status = {
        //   personal_details: authorized_user. != null,
        //   resume_uploaded: salesperson.years_of_experience != null,
        //   work_history: salesperson.professional_history?.length > 0,
        //   education_history: salesperson.education_history?.length > 0,
        // };
      }
    }

  }

  signJwtToken = (token_payload: any, validity_secods: number) => {
    return this.jwtService.sign(token_payload, {
      issuer: 'lms',
      expiresIn: validity_secods,
    });
  };

  verifyJwtToken = (token: string): any => {
    try {
      return this.jwtService.verify(token, {
        ignoreExpiration: false,
      });
    }catch(e){
      throw LmsAccessException.of(ErrorCode.INVALID_TOKEN)
    }
  }

  private extractTutorCredentials(authorization: string | undefined): string[] {
    if (!authorization) {
      throw new LmsAuthException()
    }
    const [scheme, credentials] = authorization.split(' ');
    if (scheme !== 'Basic') {
      throw new LmsAuthException()
    }
    return Buffer.from(credentials, 'base64')
      .toString('ascii')
      .split(':');
  }

}