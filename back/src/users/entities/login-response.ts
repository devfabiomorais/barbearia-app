import { ApiProperty } from '@nestjs/swagger';

export class LoginResponse {
  @ApiProperty({
    type: 'number',
    description: 'ID do usuário.',
    example: 1,
  })
  id: number;

  @ApiProperty({
    type: 'string',
    description: 'Nome do usuário.',
    example: 'John Doe',
  })
  nome: string;

  @ApiProperty({
    type: 'string',
    description: 'E-mail do usuário.',
    example: 'john-doe@email.com',
  })
  email: string;

  @ApiProperty({
    type: 'string',
    description: 'Token de acesso do usuário',
    example: 'eyJhbGciOiJIUzI1NiIs...',
  })
  jwtToken: string;
}
