import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';

@Injectable()
export class TokenGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: ExpressRequest = context.switchToHttp().getRequest();

    let apiToken: string;

    console.log(request.body);

    if (request.headers.authorization) {
      apiToken = request.headers.authorization.replace('token ', '');
    } else {
      apiToken = request.query['token'] as string;
    }

    if (apiToken !== process.env.API_TOKEN) {
      throw new UnauthorizedException('invalid authorization token');
    }

    return true;
  }
}
