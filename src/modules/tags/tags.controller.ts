import { Controller, Get, Post, Body } from '@nestjs/common';

import { UpsertTagDto } from './dto/upsert-tag.dto';
import { Tag } from './tag.entity';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  getMany(): Promise<Tag[]> {
    return this.tagsService.getMany();
  }

  @Post()
  createOne(@Body() createTagDto: UpsertTagDto): Promise<Tag> {
    return this.tagsService.createOne(createTagDto);
  }
}
