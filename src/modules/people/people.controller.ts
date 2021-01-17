import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TokenGuard } from 'src/guards/token.guard';
import { UpsertPersonDto } from './dtos/upsert-person.dto';

import { PeopleService } from './people.service';
import { Person } from './person.entity';

@Controller('people')
@UseGuards(TokenGuard)
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Post()
  createOne(@Body() createPersonDto: UpsertPersonDto): Promise<Person> {
    return this.peopleService.createOne(createPersonDto);
  }

  @Get()
  getMany(): Promise<Person[]> {
    return this.peopleService.getMany();
  }

  @Get(':id')
  getOne(@Param('id', ParseUUIDPipe) id: string): Promise<Person> {
    return this.peopleService.getOne(id);
  }

  @Patch(':id')
  updateOne(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePersonDto: UpsertPersonDto,
  ): Promise<Person> {
    return this.peopleService.updateOne(id, updatePersonDto);
  }
}
