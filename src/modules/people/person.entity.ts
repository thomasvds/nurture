import { Expose } from 'class-transformer';
import { Column, Entity, OneToMany, Unique } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { Entry } from '../entries/entry.entity';

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
  entries: Entry;

  @Expose()
  get name(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
