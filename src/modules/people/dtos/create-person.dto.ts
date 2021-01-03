import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { SimpleObjectDto } from '../../../common/simple-object.dto';

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

  @ValidateNested({ each: true })
  @Type(() => SimpleObjectDto)
  readonly tags?: SimpleObjectDto[];
}
