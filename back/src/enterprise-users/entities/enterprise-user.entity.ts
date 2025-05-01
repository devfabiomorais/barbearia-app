import { ApiProperty, OmitType } from '@nestjs/swagger';
import {
  EnterpriseUsers,
  EnterpriseUsersPermissionGroups,
  PermissionGroups,
  Address,
  PermissionGroupFunctionality,
  Functionality,
} from '@prisma/client';

type EnterpriseUserPermissionsType = EnterpriseUsersPermissionGroups & {
  PermissionGroup: PermissionGroups & {
    PermissionGroupFunctionality: Partial<PermissionGroupFunctionality> &
      {
        Functionality: Functionality;
      }[];
  };
};

class EnterpriseUserCommonsProps {
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
    type: 'string',
    description: 'Documento de identificação do usuário.',
    example: '12345678900',
  })
  document: string | null;

  @ApiProperty({
    type: 'string',
    description: 'Telefone do usuário. DDD(2 dígitos) + numero(9 dígitos)',
    example: '00912345678',
  })
  phone: string | null;

  @ApiProperty({
    type: 'boolean',
    description: 'Situação do cadastro do usuário. (Ativo ou não)',
    example: true,
  })
  active: boolean;

  @ApiProperty({
    type: 'string',
    description: 'Data do ultimo login do usuário.',
    example: '2025-04-30T15:00:00.000Z',
  })
  lastLogin: Date | null;
}

export class EnterpriseUserEntity
  extends EnterpriseUserCommonsProps
  implements Omit<EnterpriseUsers, 'profileLogo'>
{
  password: string;
  profileLogo?: Uint8Array<ArrayBufferLike> | string | null;
  enterpriseId: number;
  EnterpriseUserPermissions?: EnterpriseUserPermissionsType[];
  Address?: Address | null;
  addressId: number | null;
}

export class ResponseEnterpriseUserEntity extends EnterpriseUserCommonsProps {
  password?: string | null;
  enterpriseId?: number | null;

  @ApiProperty({
    type: 'number',
    description: 'Id do endereço cadastro e vinculado ao usuário',
    example: 1,
  })
  addressId: number | null;

  @ApiProperty({
    type: 'object',
    properties: {
      id: { type: 'number', example: 1 },
      zipCode: { type: 'string', example: '12345678' },
      street: { type: 'string', example: 'Rua A' },
      number: { type: 'number', example: 1 },
      complement: { type: 'string', example: 'Casa 1', required: false },
      district: { type: 'string', example: 'Centro' },
      city: { type: 'string', example: 'São Paulo' },
      state: { type: 'string', example: 'SP' },
      country: { type: 'string', example: 'Brasil' },
    },
    description:
      'Lista de funcionalidades que o usuário tem permissão para acesso.',
  })
  Address?: Address | null;

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
    description: 'Imagem de perfil do usuário (Base64)',
    example: 'iVBORw0KGgoAAAANSUhEU...',
  })
  profileLogo?: string | null;
}

export class UpdateEnterpriseUserEntityResponse extends OmitType(
  EnterpriseUserEntity,
  [
    'profileLogo',
    'password',
    'Address',
    'addressId',
    'enterpriseId',
    'EnterpriseUserPermissions',
  ] as const,
) {}
