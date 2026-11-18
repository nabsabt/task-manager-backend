import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { MOCKED_USERS } from '../mocked.users.js';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor() {}
  use(req: any, res: any, next: () => void) {
    const usernames: string[] = MOCKED_USERS.map((user) => {
      return user.username;
    });
    if (!req.headers.authorization) {
      throw new UnauthorizedException('Unauthorized request!');
    }

    const username = req.headers.authorization.split(' ')[1];
    if (!username) {
      throw new UnauthorizedException('Username is missing!');
    }

    if (usernames.includes(username)) {
      next();
    } else {
      throw new UnauthorizedException('Invalid username!');
    }
  }
}
