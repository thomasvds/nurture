import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePersonDto } from './dtos/create-person.dto';
import { Person } from './person.entity';

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(Person)
    private readonly peopleRepository: Repository<Person>,
  ) {}

  async createOne(createPersonDto: CreatePersonDto): Promise<Person> {
    const { id } = await this.peopleRepository.save(createPersonDto);
    return this.getOne(id);
  }

  getMany(): Promise<Person[]> {
    return this.peopleRepository.find({
      order: {
        lastName: 'ASC',
        firstName: 'ASC',
      },
    });
  }

  async getOne(id: string): Promise<Person> {
    return this.peopleRepository
      .createQueryBuilder('p')
      .where('p.id = :id', { id })
      .leftJoinAndSelect('p.entries', 'entries')
      .orderBy({
        'entries.created_at': 'DESC',
      })
      .getOne();
  }

  getOneByNickname(nickname: string): Promise<Person> {
    return this.peopleRepository.findOne({ where: { nickname } });
  }
}
