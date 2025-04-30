import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class EnterpriseUserLoginDto {
  @ApiProperty({
    type: 'string',
    description: 'Endereço de email do usuário.',
    example: 'admin@admin.com',
  })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Credenciais inválidas' })
  email: string;

  @ApiProperty({
    type: 'string',
    description: 'Senha do usuário.',
    example: '123456',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Credenciais inválidas' })
  password: string;
}
