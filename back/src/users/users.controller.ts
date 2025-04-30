import { Controller, Post, Body, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginDto } from './dto/login-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  public async login(@Body() loginDto: UserLoginDto): Promise<LoginResponse> {
    return this.usersService.login(loginDto);
  }

  @Post()
  async create(@Body() createUsuarioDto: CreateUserDto) {
    return this.usersService.create(createUsuarioDto);
  }
}
