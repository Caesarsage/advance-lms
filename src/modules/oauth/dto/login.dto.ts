import { Transform } from 'class-transformer';
import { ValidateIf, IsNotEmpty, IsIn, Matches } from 'class-validator';
import { AppSector } from 'src/infrastructures/enums/sector.enum';


export class LoginDto {
  @IsIn(['client_credentials', 'password', 'refresh_token'], {
    message: 'Unsupported grant type',
  })
  grant_type: string;

  @IsNotEmpty({ message: 'Required field' })
  @ValidateIf((v) => v.grant_type === 'password')
  username: string | undefined;

  @IsNotEmpty({ message: 'Required field' })
  @ValidateIf((v) => v.grant_type === 'password')
  password: string | undefined;

  @IsNotEmpty({ message: 'Required field' })
  @ValidateIf((v) => v.grant_type === 'refresh_token')
  refresh_token: string | undefined;

  @ValidateIf((v) => !!v.sector)
  @Matches(`^(${Object.values(AppSector).join('|')})$`, 'i', {
    message: `Cannot accept a value other than [${Object.values(AppSector).join(
      ', ',
    )}]`,
  })
  @Transform((v) => v.value.toUpperCase())
  sector_type: AppSector;
}
