import { Expose } from 'class-transformer';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  Unique,
} from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { Entry } from '../entries/entry.entity';
import { Tag } from '../tags/tag.entity';

@Entity({ name: 'people' })
@Unique('UQ_PEOPLE', ['firstName', 'lastName'])
export class Person extends AbstractEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: 'boolean', default: false })
  favorite: boolean;

  @Column({ type: 'date', nullable: true })
  birthdate: Date;

  @OneToMany(() => Entry, (entry) => entry.person)
  entries: Entry[];

  @ManyToMany(() => Tag, (tag) => tag.people)
  @JoinTable()
  tags: Tag[];

  @Expose()
  get name(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
