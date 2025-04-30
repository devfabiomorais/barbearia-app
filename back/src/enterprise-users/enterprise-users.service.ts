import { Injectable } from '@nestjs/common';
import { CreateEnterpriseUserDto } from './dto/create-enterprise-user.dto';
import { UpdateEnterpriseUserDto } from './dto/update-enterprise-user.dto';
import { EnterpriseUserLoginDto } from './dto/login-enterprise-user.dto';
import { EnterpriseUsersRepository } from './repositories/enterprise-users.repository';
import { UnauthorizedError } from 'src/common/errors/types/UnauthorizedError';
import { EnterpriseUserEntity } from './entities/enterprise-user.entity';
import * as bcrypt from 'bcryptjs';
import { EnterpriseAuthService } from 'src/auth/enterprise-auth.service';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';
import { ConflictError } from 'src/common/errors/types/ConflictError';

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
    const jwtToken = await this.enterpriseAuthService.createAccessToken(user);

    await this.enterpriseUsersRepository.updateUserLastLogin(user.id);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      permissionGroups:
        user.EnterpriseUserPermissions?.map((item) => ({
          id: item.PermissionGroup.id,
          description: item.PermissionGroup.description,
        })) || [],
      jwtToken: jwtToken,
    };
  }

  async create(createEnterpriseUserDto: CreateEnterpriseUserDto) {
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
    return this.enterpriseUsersRepository.create({
      ...createEnterpriseUserDto,
      password,
    });
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

  findAll() {
    return this.enterpriseUsersRepository.getAllUsers();
  }

  async findOne(id: number) {
    const user = await this.enterpriseUsersRepository.findUserById(id);
    if (!user) {
      throw new NotFoundError('Usuário não encontrado');
    }

    return user;
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

  hashPassword(pass: string) {
    const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS);
    return bcrypt.hash(pass, saltRounds);
  }
}
