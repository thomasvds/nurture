import { IsString, IsUUID } from 'class-validator';

export class SimpleObjectDto {
  @IsUUID()
  @IsString()
  id: string;
}
