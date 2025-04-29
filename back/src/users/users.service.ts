import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) { }

  // Método para criar um usuário
  async create(createUsuarioDto: CreateUserDto) {
    const { nome, email, senha } = createUsuarioDto;

    // Verifica se o usuário com o mesmo e-mail já existe
    const userExists = await this.prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      throw new Error('Usuário já existe com esse e-mail.');
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Cria o novo usuário no banco de dados
    const user = await this.prisma.user.create({
      data: {
        nome,
        email,
        senha: hashedPassword, // Senha criptografada
      },
    });

    return user;
  }
}
