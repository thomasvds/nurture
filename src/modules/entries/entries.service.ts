import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEntryDto } from './dtos/create-entry.dto';
import { Entry } from './entry.entity';

@Injectable()
export class EntriesService {
  constructor(
    @InjectRepository(Entry)
    private readonly entriesRepository: Repository<Entry>,
  ) {}

  async createOne(createEntryDto: CreateEntryDto): Promise<Entry> {
    const { id } = await this.entriesRepository.save({
      ...createEntryDto,
      title: 'Note',
    });

    return this.getOne(id);
  }

  getMany(): Promise<Entry[]> {
    return this.entriesRepository.find({
      order: {
        date: 'DESC',
      },
    });
  }

  async getOne(id: string): Promise<Entry> {
    const entry = await this.entriesRepository.findOne({ where: { id } });

    if (!entry) {
      throw new NotFoundException();
    }

    return entry;
  }
}
