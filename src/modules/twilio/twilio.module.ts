import { Module } from '@nestjs/common';
import { EntriesModule } from '../entries/entries.module';
import { PeopleModule } from '../people/people.module';
import { TwilioController } from './twilio.controller';
import { TwilioService } from './twilio.service';

@Module({
  imports: [PeopleModule, EntriesModule],
  providers: [TwilioService],
  controllers: [TwilioController],
})
export class TwilioModule {}
