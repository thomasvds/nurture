import { Expose } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { Person } from '../people/person.entity';

@Entity({ name: 'entries' })
export class Entry extends AbstractEntity {
  @ManyToOne(() => Person, {
    cascade: true,
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn()
  person: Person;

  @Column('uuid')
  personId: string;

  @Column()
  date: Date;

  @Column()
  title: string;

  @Column()
  content: string;

  @Expose()
  get formattedDate(): string {
    return this.date.toDateString();
  }
}
