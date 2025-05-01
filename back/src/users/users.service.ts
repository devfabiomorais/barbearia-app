import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UserLoginDto } from './dto/login-user.dto';
import { UnauthorizedError } from 'src/common/errors/types/UnauthorizedError';
import { UserEntity } from './entities/user.entity';
import { UsersRepository } from './repositories/users.repository';
import { UserAuthService } from 'src/auth/user-auth.service';
import { ConflictError } from 'src/common/errors/types/ConflictError';
import { LoginResponse } from './entities/login-response';

@Injectable()
export class UsersService {
  constructor(    
    private readonly usersRepository: UsersRepository,
    private readonly userAuthService: UserAuthService,
  ) {}

  public async login(loginDto: UserLoginDto): Promise<LoginResponse> {
    const user = await this.usersRepository.findUserByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedError('Credenciais Inválidas');
    }

    const match: boolean = await this.checkPassword(loginDto.password, user);
    if (!match) {
      throw new UnauthorizedError('Credenciais Inválidas');
    }
    const jwtToken = await this.userAuthService.createAccessToken({
      userId: user.id,
    });

    return {
      id: user.id,
      nome: user.nome,
      email: user.email,
      jwtToken: jwtToken,
    };
  }

  async create(createUsuarioDto: CreateUserDto) {
    const { nome, email, senha } = createUsuarioDto;

    const userExists = await this.usersRepository.findUserByEmail(email);

    if (userExists) {
      throw new ConflictError('Usuário já existe com esse e-mail.');
    }

    const hashedPassword = await this.hashPassword(senha);

    const user = await this.usersRepository.create({
      nome,
      email,
      senha: hashedPassword,
    });

    return {
      id: user.id,
      nome: user.nome,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  private async checkPassword(
    pass: string,
    user: UserEntity,
  ): Promise<boolean> {
    const match = await bcrypt.compare(pass, user.senha);
    if (!match) {
      throw new UnauthorizedError('Credenciais Inválidas');
    }
    return match;
  }

  hashPassword(pass: string) {
    const saltRounds = 10;
    return bcrypt.hash(pass, saltRounds);
  }
}
