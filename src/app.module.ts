import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as dotenv from 'dotenv';
import * as ormConfig from './ormconfig';

import { PeopleModule } from './modules/people/people.module';
import { EntriesModule } from './modules/entries/entries.module';
import { TwilioModule } from './modules/twilio/twilio.module';
import { TagsModule } from './modules/tags/tags.module';

dotenv.config({
  path: `.${process.env.NODE_ENV || 'development'}.env`,
});

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    PeopleModule,
    EntriesModule,
    TwilioModule,
    TagsModule,
  ],
})
export class AppModule {}
