import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Render,
} from '@nestjs/common';
import { CreatePersonDto } from './dtos/create-person.dto';

import { PeopleService } from './people.service';
import { Person } from './person.entity';

@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Post()
  createOne(@Body() createPersonDto: CreatePersonDto): Promise<Person> {
    return this.peopleService.createOne(createPersonDto);
  }

  @Get()
  getMany(): Promise<Person[]> {
    return this.peopleService.getMany();
  }

  @Get(':id')
  @Render('index')
  getOne(@Param('id', ParseUUIDPipe) id: string): Promise<Person> {
    return this.peopleService.getOne(id);
  }
}
