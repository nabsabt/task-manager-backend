import { Injectable } from '@nestjs/common';
import { MOCKED_USERS } from '../mocked.users.js';

@Injectable()
export class AuthService {
  /**
   * To simulate real auth process, function returns a Promise,
   * with intentional delay to simulate real-life auth process.
   * WARNING: This is a test case, passwords are stored unsafe. NEVER store any real user password without bcrypt.
   */
  public async postLogin(
    userName: string,
    pwd: string,
  ): Promise<{
    status: string;
    userData: { loggedInName: string | undefined };
  }> {
    const mockedUsers = MOCKED_USERS;
    const match = mockedUsers.find((user) => user.username === userName);
    return new Promise((resolve) => {
      let status = '';
      let userData: { loggedInName: string | undefined } = {
        loggedInName: undefined,
      };
      if (!match) {
        status = 'User not found!';
      } else if (match?.password !== pwd) status = 'Incorrect password!';
      else {
        status = 'success';
        userData.loggedInName = userName;
      }
      setTimeout(() => {
        resolve({ status, userData });
      }, 2000);
    });
  }
}
