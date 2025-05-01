import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateEnterpriseUserDto {
  @ApiProperty({
    type: 'string',
    description: 'Nome do usuário.',
    example: 'John Doe',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: 'string',
    description: 'E-mail do usuário.',
    example: 'john-doe@email.com',
    required: false,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: 'string',
    description: 'Senha do usuário.',
    example: '123456',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  password: string;

  @ApiProperty({
    type: 'string',
    description: 'Documento de identificação do usuário.',
    example: '12345678900',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
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
  @IsNotEmpty()
  phone?: string;
}
