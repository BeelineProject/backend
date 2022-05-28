/* eslint-disable prettier/prettier */
import { UserRoleEnum } from '../../user/entities/user.entity';

export interface JwtPayloadDto {
  username: string;
  role: UserRoleEnum;
  email: string;
}
