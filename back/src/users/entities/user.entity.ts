import { ApiProperty, OmitType } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class UserEntity implements User {
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

  senha: string;

  @ApiProperty({
    type: 'string',
    description: 'Data de criação do usuário.',
    example: '2025-04-30T15:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    type: 'string',
    description: 'Data de atualização do usuário.',
    example: '2025-04-30T15:00:00.000Z',
  })
  updatedAt: Date;
}

export class CreateUserEntityResponse extends OmitType(UserEntity, [
  'senha',
] as const) {}
