import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginDto } from './dto/login-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginResponse } from './entities/login-response';
import { CreateUserEntityResponse } from './entities/user.entity';

@ApiTags('Usuários')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  @ApiOperation({ summary: 'Autenticar um usuário (cliente)' })
  @ApiResponse({
    status: 201,
    description:
      'Autenticação realizada com sucesso. Retorna o token de acesso (JWT) e os dados do usuário.',
    type: LoginResponse,
  })
  public async login(@Body() loginDto: UserLoginDto): Promise<LoginResponse> {
    return this.usersService.login(loginDto);
  }

  @Post()
  @ApiOperation({ summary: 'Cadastrar um novo usuário (cliente)' })
  @ApiResponse({
    status: 201,
    description: 'Usuário cadastrado com sucesso.',
    type: CreateUserEntityResponse,
  })
  async create(@Body() createUsuarioDto: CreateUserDto) {
    return this.usersService.create(createUsuarioDto);
  }
}
