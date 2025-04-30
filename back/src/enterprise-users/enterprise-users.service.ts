import { Injectable } from '@nestjs/common';
import { CreateEnterpriseUserDto } from './dto/create-enterprise-user.dto';
import { UpdateEnterpriseUserDto } from './dto/update-enterprise-user.dto';
import { EnterpriseUserLoginDto } from './dto/login-enterprise-user.dto';
import { EnterpriseUsersRepository } from './repositories/enterprise-users.repository';
import { UnauthorizedError } from 'src/common/errors/types/UnauthorizedError';
import {
  EnterpriseUserEntity,
  ResponseEnterpriseUserEntity,
} from './entities/enterprise-user.entity';
import * as bcrypt from 'bcryptjs';
import { EnterpriseAuthService } from 'src/auth/enterprise-auth.service';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';
import { ConflictError } from 'src/common/errors/types/ConflictError';
import { Functionality } from '@prisma/client';
import { EnterpriseLoginResponse } from 'src/@types/enterprise-login-response';

@Injectable()
export class EnterpriseUsersService {
  constructor(
    private readonly enterpriseUsersRepository: EnterpriseUsersRepository,
    private readonly enterpriseAuthService: EnterpriseAuthService,
  ) {}

  public async login(
    loginDto: EnterpriseUserLoginDto,
  ): Promise<EnterpriseLoginResponse> {
    const user = await this.enterpriseUsersRepository.findUserByEmail(
      loginDto.email,
    );
    if (!user) {
      throw new UnauthorizedError('Credenciais Inválidas');
    }

    const match: boolean = await this.checkPassword(loginDto.password, user);
    if (!match) {
      throw new UnauthorizedError('Credenciais Inválidas');
    }

    const jwtToken = await this.enterpriseAuthService.createAccessToken({
      userId: user.id,
      enterpriseId: user.enterpriseId,
    });

    await this.enterpriseUsersRepository.updateUserLastLogin(user.id);

    const { PermissionGroups, Functionalities } = this.transformUser(user);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      PermissionGroups,
      Functionalities,
      jwtToken: jwtToken,
    };
  }

  async create(
    createEnterpriseUserDto: CreateEnterpriseUserDto,
    enterpriseId: number,
  ) {
    const emailAlreadyInUse =
      await this.enterpriseUsersRepository.findUserByEmail(
        createEnterpriseUserDto.email,
      );
    if (emailAlreadyInUse) {
      throw new ConflictError(
        'Este endereço de e-mail já está sendo usado por outro usuário.',
      );
    }
    const password = await this.hashPassword(createEnterpriseUserDto.password);
    return this.enterpriseUsersRepository.create(
      {
        ...createEnterpriseUserDto,
        password,
      },
      enterpriseId,
    );
  }

  async update(id: number, updateEnterpriseUserDto: UpdateEnterpriseUserDto) {
    const user = await this.enterpriseUsersRepository.findUserById(id);
    if (!user) {
      throw new NotFoundError('Usuário não encontrado');
    }

    const match: boolean = await this.checkPassword(
      updateEnterpriseUserDto.password,
      user,
    );

    if (!match) {
      throw new UnauthorizedError('Credenciais Inválidas');
    }

    const updateUserDto: Partial<UpdateEnterpriseUserDto> = {
      ...updateEnterpriseUserDto,
    };

    if (updateUserDto.email) {
      const emailAlreadyInUse =
        await this.enterpriseUsersRepository.findUserByEmail(
          updateUserDto.email,
        );
      if (emailAlreadyInUse && emailAlreadyInUse.id !== id) {
        throw new ConflictError(
          'Este endereço de e-mail já está sendo usado por outro usuário.',
        );
      }
    }

    if (updateUserDto.newPassword) {
      updateUserDto.password = await this.hashPassword(
        updateUserDto.newPassword,
      );
      delete updateUserDto.newPassword;
    } else {
      delete updateUserDto.password;
    }

    return this.enterpriseUsersRepository.updateUser(id, updateUserDto);
  }

  async findAll(): Promise<ResponseEnterpriseUserEntity[]> {
    const allUsers = await this.enterpriseUsersRepository.getAllUsers();
    return allUsers.map((user) => this.transformUser(user));
  }

  async findOne(id: number) {
    const user = await this.enterpriseUsersRepository.findUserById(id);
    if (!user) {
      throw new NotFoundError('Usuário não encontrado');
    }

    const userDetails = this.transformUser(user);

    return {
      ...userDetails,
      profileLogo: user.profileLogo?.toBase64(),
      password: undefined,
    };
  }

  private async checkPassword(
    pass: string,
    user: EnterpriseUserEntity,
  ): Promise<boolean> {
    const match = await bcrypt.compare(pass, user.password);
    if (!match) {
      throw new UnauthorizedError('Credenciais Inválidas');
    }
    return match;
  }

  private hashPassword(pass: string) {
    const saltRounds = 10;
    return bcrypt.hash(pass, saltRounds);
  }

  private transformUser(
    user: EnterpriseUserEntity,
  ): ResponseEnterpriseUserEntity {
    const permissionGroups = this.extractPermissionGroups(user);
    const functionalities = this.extractUniqueFunctionalities(user);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      document: user.document,
      phone: user.phone,
      active: user.active,
      lastLogin: user.lastLogin,
      addressId: user.addressId,
      Address: user.Address,
      PermissionGroups: permissionGroups,
      Functionalities: functionalities,
    };
  }

  private extractPermissionGroups(
    user: EnterpriseUserEntity,
  ): { id: number; description: string }[] {
    return (
      user.EnterpriseUserPermissions?.map(({ PermissionGroup }) => ({
        id: PermissionGroup.id,
        description: PermissionGroup.description,
      })) || []
    );
  }

  private extractUniqueFunctionalities(
    user: EnterpriseUserEntity,
  ): Partial<Functionality>[] {
    const functionalitiesMap = new Map<number, Partial<Functionality>>();

    user.EnterpriseUserPermissions?.forEach(({ PermissionGroup }) => {
      PermissionGroup.PermissionGroupFunctionality?.forEach(
        ({ Functionality }) => {
          const { id, description, moduleId } = Functionality;
          functionalitiesMap.set(id, { id, description, moduleId });
        },
      );
    });

    return Array.from(functionalitiesMap.values());
  }
}
