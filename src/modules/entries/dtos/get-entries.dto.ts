import { Transform } from 'class-transformer';
import { IsDefined, IsInt } from 'class-validator';

export class GetEntriesDto {
  @Transform(parseInt)
  @IsInt()
  @IsDefined()
  readonly from: number;

  @Transform(parseInt)
  @IsInt()
  @IsDefined()
  readonly to: number;
}
