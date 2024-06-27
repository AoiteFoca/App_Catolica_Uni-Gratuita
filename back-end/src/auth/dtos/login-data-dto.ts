import { IsNotEmpty } from 'class-validator';

export class LoginData {
  @IsNotEmpty()
  readonly login: string;

  @IsNotEmpty()
  readonly password: string;
}