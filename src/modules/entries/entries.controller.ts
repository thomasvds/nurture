import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { TokenGuard } from 'src/guards/token.guard';
import { CreateEntryDto } from './dtos/create-entry.dto';

import { EntriesService } from './entries.service';
import { Entry } from './entry.entity';

@Controller('entries')
@UseGuards(TokenGuard)
export class EntriesController {
  constructor(private readonly entriesService: EntriesService) {}

  @Post()
  createOne(@Body() createEntryDto: CreateEntryDto): Promise<Entry> {
    return this.entriesService.createOne(createEntryDto);
  }
}
