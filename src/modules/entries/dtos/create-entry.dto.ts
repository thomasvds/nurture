import { Transform, Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { SimpleObjectDto } from 'src/common/simple-object.dto';
import { EntryCategory } from '../enums/category.enum';

export class CreateEntryDto {
  @IsUUID()
  readonly personId: string;

  @IsString()
  @IsNotEmpty()
  readonly content: string;

  @IsEnum(EntryCategory)
  readonly category: EntryCategory;

  @IsString()
  @IsNotEmpty()
  @Transform((title) => title || 'Note')
  readonly title?: string;

  @IsString()
  @Transform((date) => date || new Date().toLocaleDateString('en-US'))
  readonly date?: string;

  @ValidateNested({ each: true })
  @Type(() => SimpleObjectDto)
  readonly mentions?: SimpleObjectDto[];
}
