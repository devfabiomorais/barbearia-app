import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateEnterpriseUserDto {
  @ApiProperty({
    type: 'string',
    description: 'Nome do usuário.',
    example: 'John Doe',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    type: 'string',
    description: 'E-mail do usuário.',
    example: 'john-doe@email.com',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    type: 'string',
    description: 'Senha do usuário.',
    example: '123456',
    required: true,
  })
  @IsString()
  @MinLength(6, { message: 'Credenciais inválidas' })
  password: string;

  @ApiProperty({
    type: 'string',
    description: 'Nova senha do usuário.',
    example: '123456',
    required: false,
  })
  @IsString()
  @MinLength(6, { message: 'A nova senha deve ter no mínimo 6 caracteres' })
  @IsOptional()
  newPassword?: string;

  @ApiProperty({
    type: 'string',
    description: 'Documento de identificação do usuário.',
    example: '12345678900',
    required: false,
  })
  @IsString()
  @IsOptional()
  document?: string;

  @ApiProperty({
    type: 'string',
    description: 'Telefone do usuário. DDD(2 dígitos) + numero(9 dígitos)',
    example: '00912345678',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(13, {
    message: 'O número de telefone deve ter 13 dígitos. Ex: 00912345678',
  })
  @MinLength(13, {
    message: 'O número de telefone deve ter 13 dígitos. Ex: 00912345678',
  })
  phone?: string;
}
