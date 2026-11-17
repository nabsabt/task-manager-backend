import { Controller, Get, Query } from '@nestjs/common';
import { TaskService } from '../@Service/task.service.js';
import { AuthService } from '../@Service/auth.service.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  public async login(
    @Query()
    params: {
      username: string;
      password: string;
    },
  ): Promise<{
    status: string;
    userData: { loggedInName: string | undefined };
  }> {
    const loginStatus = await this.authService.postLogin(
      params.username,
      params.password,
    );
    return loginStatus;
  }
}
