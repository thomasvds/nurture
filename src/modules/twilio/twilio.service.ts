import { Injectable } from '@nestjs/common';

import * as Twilio from 'twilio';

@Injectable()
export class TwilioService {
  async sendSms({
    body,
    from,
    to,
    accountSid,
  }: {
    body: string;
    from: string;
    to: string;
    accountSid: string;
  }): Promise<void> {
    const client = Twilio(accountSid, process.env.TWILIO_AUTH_TOKEN);

    client.messages.create({ body, from, to });
  }
}
