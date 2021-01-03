import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UpsertTagDto } from './dto/upsert-tag.dto';
import { Tag } from './tag.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
  ) {}

  createOne(createTagDto: UpsertTagDto): Promise<Tag> {
    const tag = this.tagsRepository.create(createTagDto);

    return this.tagsRepository.save(tag);
  }

  getMany(): Promise<Tag[]> {
    return this.tagsRepository.find({});
  }
}
