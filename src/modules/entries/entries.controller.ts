import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateEntryDto } from './dtos/create-entry.dto';

import { EntriesService } from './entries.service';
import { Entry } from './entry.entity';

@Controller('entries')
export class EntriesController {
  constructor(private readonly entriesService: EntriesService) {}

  @Post()
  createOne(@Body() createEntryDto: CreateEntryDto): Promise<Entry> {
    return this.entriesService.createOne(createEntryDto);
  }

  @Get()
  getMany(): Promise<Entry[]> {
    return this.entriesService.getMany();
  }
}
