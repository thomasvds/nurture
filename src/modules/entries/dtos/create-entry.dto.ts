import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
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
}
