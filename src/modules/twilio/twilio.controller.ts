import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Query,
} from '@nestjs/common';
import { EntriesService } from '../entries/entries.service';
import { PeopleService } from '../people/people.service';
import { TwilioSmsDto } from './dto/sms.dto';
import { TwilioService } from './twilio.service';

const ABOUT_PREFIX = 'About ';

@Controller('twilio')
export class TwilioController {
  constructor(
    private readonly entriesService: EntriesService,
    private readonly peopleService: PeopleService,
    private readonly twilioService: TwilioService,
  ) {}

  @Post('sms')
  async createSms(
    @Body() { From, To, Body, AccountSid }: TwilioSmsDto,
    @Query('token') token: string,
  ): Promise<void> {
    console.log(process.env.TWILIO_WEBHOOKS_TOKEN);
    console.log(process.env.AUTHORIZED_PHONE_NUMBER);

    if (token !== process.env.TWILIO_WEBHOOKS_TOKEN) {
      console.log('oops1');
      throw new UnauthorizedException();
    }

    if (From !== process.env.AUTHORIZED_PHONE_NUMBER) {
      console.log('oops2');
      throw new UnauthorizedException();
    }

    if (Body.startsWith(ABOUT_PREFIX)) {
      const name = Body.substr(ABOUT_PREFIX.length);

      const [lastName, firstName] = name.trim().split(', ');
      const person = await this.peopleService.getOrCreateOneByName({
        firstName,
        lastName,
      });

      const entries = await this.entriesService.getManyByPersonId(person.id, 3);

      const reply = entries
        .map((e) => `${e.formattedDate} - ${e.content}`)
        .join('\n');

      this.twilioService.sendSms({
        body: reply,
        from: To,
        to: From,
        accountSid: AccountSid,
      });
    } else {
      const date = Body.slice(0, 10);
      const [name, content] = Body.substr(11).split(':');

      const [lastName, firstName] = name.trim().split(', ');

      const person = await this.peopleService.getOrCreateOneByName({
        firstName,
        lastName,
      });

      this.entriesService.createOne({
        date: date.trim(),
        personId: person.id,
        content: content.trim(),
      });
    }
  }
}
