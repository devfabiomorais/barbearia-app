import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: 'string',
    description: 'Nome do usuário.',
    example: 'admin@admin.com',
  })
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  nome: string;

  @ApiProperty({
    type: 'string',
    description: 'Endereço de email do usuário.',
    example: 'admin@admin.com',
  })
  @IsEmail({}, { message: 'E-mail inválido.' })
  email: string;

  @ApiProperty({
    type: 'string',
    description: 'Senha do usuário.',
    example: '123456',
  })
  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres.' })
  senha: string;
}
