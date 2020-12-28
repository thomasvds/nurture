import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateEntryDto {
  @IsUUID()
  readonly personId: string;

  @IsString()
  @IsNotEmpty()
  readonly content: string;

  @IsString()
  @Transform((date) => date || new Date().toLocaleDateString('en-US'))
  readonly date?: string;
}
