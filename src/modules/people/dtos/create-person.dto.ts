import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { SimpleObjectDto } from '../../../common/simple-object.dto';
import { PersonStage } from '../enums/stage.enum';

export class CreatePersonDto {
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  readonly birthdate?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly description?: string;

  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsEnum(PersonStage)
  @IsOptional()
  readonly stage?: PersonStage;

  @ValidateNested({ each: true })
  @Type(() => SimpleObjectDto)
  readonly tags?: SimpleObjectDto[];
}
