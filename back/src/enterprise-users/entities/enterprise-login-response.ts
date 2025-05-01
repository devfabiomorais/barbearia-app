import { ApiProperty } from '@nestjs/swagger';
import { Functionality, PermissionGroups } from '@prisma/client';

export class EnterpriseLoginResponse {
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
  name: string;

  @ApiProperty({
    type: 'string',
    description: 'E-mail do usuário.',
    example: 'john-doe@email.com',
  })
  email: string;

  @ApiProperty({
    type: 'array',
    description: 'Grupos de permissão em que o usuário está vinculado.',
    example: [{ id: 1, description: 'Administrador' }],
  })
  PermissionGroups: Partial<PermissionGroups>[];

  @ApiProperty({
    type: 'array',
    description:
      'Lista de funcionalidades que o usuário tem permissão para acesso.',
    example: [
      {
        id: 1,
        description: 'Cadastro de Usuários',
      },
    ],
  })
  Functionalities: Partial<Functionality>[];

  @ApiProperty({
    type: 'string',
    description: 'Token de acesso do usuário',
    example: 'eyJhbGciOiJIUzI1NiIs...',
  })
  jwtToken: string;
}
