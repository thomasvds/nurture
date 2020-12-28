import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePersonDto {
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  readonly birthdate?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly nickname?: string;

  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;
}
