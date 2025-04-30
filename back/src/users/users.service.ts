import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createUsuarioDto: CreateUserDto) {
    const { nome, email, senha } = createUsuarioDto;

    const userExists = await this.prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      throw new Error('Usuário já existe com esse e-mail.');
    }

    const hashedPassword = await bcrypt.hash(senha, 10);

    const user = await this.prisma.user.create({
      data: {
        nome,
        email,
        senha: hashedPassword,
      },
    });

    return user;
  }
}
