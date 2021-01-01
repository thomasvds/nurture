import { IsPhoneNumber, IsString } from 'class-validator';

export class TwilioSmsDto {
  @IsString()
  Body: string;

  @IsPhoneNumber('BE')
  From: string;

  @IsPhoneNumber('BE')
  To: string;

  @IsString()
  AccountSid: string;
}
