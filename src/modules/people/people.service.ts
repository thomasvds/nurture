import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpsertPersonDto } from './dtos/upsert-person.dto';
import { Person } from './person.entity';

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(Person)
    private readonly peopleRepository: Repository<Person>,
  ) {}

  async createOne(createPersonDto: UpsertPersonDto): Promise<Person> {
    const { id } = await this.peopleRepository.save(createPersonDto);
    return this.getOne(id);
  }

  getMany(): Promise<Person[]> {
    return this.peopleRepository.find({
      order: {
        lastName: 'ASC',
        firstName: 'ASC',
      },
      relations: ['tags'],
    });
  }

  async getOne(id: string): Promise<Person> {
    return this.peopleRepository
      .createQueryBuilder('p')
      .where('p.id = :id', { id })
      .leftJoinAndSelect('p.entries', 'entries')
      .leftJoinAndSelect('p.mentions', 'mentions')
      .leftJoinAndSelect('p.tags', 'tags')
      .orderBy({
        'entries.date': 'DESC',
        'mentions.date': 'DESC',
      })
      .getOne();
  }

  async getOrCreateOneByName({
    firstName,
    lastName,
  }: {
    firstName: string;
    lastName: string;
  }): Promise<Person> {
    let person = await this.peopleRepository.findOne({
      where: { firstName, lastName },
    });

    if (!person) {
      person = await this.createOne({ firstName, lastName });
    }

    return person;
  }

  async updateOne(
    id: string,
    updatePersonDto: UpsertPersonDto,
  ): Promise<Person> {
    const person = await this.getOne(id);
    await this.peopleRepository.save({ ...person, ...updatePersonDto });
    return this.getOne(id);
  }
}
