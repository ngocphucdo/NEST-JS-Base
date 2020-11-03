import { LoginUserDTO } from './dtos/LoginUser.dto';
import { UsersService } from './users.service';
import { RegisterUserDTO } from './dtos/RegisterUser.dto';
import { Body, Controller, Post, Res } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  async register(@Body() body: RegisterUserDTO, @Res() response) {
    const newUser = await this.usersService.register(body);
    if (newUser instanceof Error) {
      response.send({ msg: 'Register failed', error: newUser.message });
      return;
    } else {
      response.send({ msg: 'Register success' });
      return;
    }
  }

  @Post('/login')
  async login(@Body() body: LoginUserDTO, @Res() response) {
    const loggedIn = await this.usersService.login(body);
    if (loggedIn instanceof Error) {
      response.send({
        msg: 'Logged failed! Re-check username or password, please',
      });
      return;
    }
    response.send({ msg: 'Logged in', data: loggedIn });
    return;
  }
}
