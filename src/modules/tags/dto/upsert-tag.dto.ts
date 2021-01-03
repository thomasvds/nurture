import { IsNotEmpty, IsString } from 'class-validator';

export class UpsertTagDto {
  @IsNotEmpty()
  @IsString()
  readonly label: string;
}
