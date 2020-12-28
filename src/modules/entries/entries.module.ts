import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntriesController } from './entries.controller';
import { EntriesService } from './entries.service';
import { Entry } from './entry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Entry])],
  providers: [EntriesService],
  controllers: [EntriesController],
  exports: [EntriesService],
})
export class EntriesModule {}
