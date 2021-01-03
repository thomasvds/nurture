import { Exclude } from 'class-transformer';
import { Column, Entity, ManyToMany } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { Person } from '../people/person.entity';

@Entity({ name: 'tags' })
export class Tag extends AbstractEntity {
  @Exclude()
  @ManyToMany(() => Person, (person) => person.tags)
  people: Person[];

  @Column({ nullable: false })
  label: string;
}
