import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { EnterpriseUsersService } from './enterprise-users.service';
import { UpdateEnterpriseUserDto } from './dto/update-enterprise-user.dto';
import { EnterpriseUserLoginDto } from './dto/login-enterprise-user.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  EnterpriseUserEntity,
  ResponseEnterpriseUserEntity,
} from './entities/enterprise-user.entity';
import { AccessControlGuard } from 'src/common/guards/access-control.guard';
import { USER_REGISTRATION } from 'src/functionalities';
import { CreateEnterpriseUserDto } from './dto/create-enterprise-user.dto';
import { EnterpriseLoginResponse } from 'src/@types/enterprise-login-response';

@Controller('enterprise-users')
export class EnterpriseUsersController {
  constructor(
    private readonly enterpriseUsersService: EnterpriseUsersService,
  ) {}

  @Post('login')
  public async login(
    @Body() loginDto: EnterpriseUserLoginDto,
  ): Promise<EnterpriseLoginResponse> {
    return this.enterpriseUsersService.login(loginDto);
  }

  @Get('details')
  @UseGuards(AuthGuard('enterprise-jwt'))
  userDetails(@Req() request): Promise<Partial<ResponseEnterpriseUserEntity>> {
    return this.enterpriseUsersService.findOne(request.user.id);
  }

  @Post()
  @UseGuards(AccessControlGuard(USER_REGISTRATION))
  public async create(
    @Body() createEnterpriseUserDto: CreateEnterpriseUserDto,
    @Req() request,
  ): Promise<Partial<EnterpriseUserEntity>> {
    return this.enterpriseUsersService.create(
      createEnterpriseUserDto,
      request.user.enterpriseId,
    );
  }

  @Get()
  @UseGuards(AccessControlGuard(USER_REGISTRATION))
  findAll(): Promise<Partial<ResponseEnterpriseUserEntity>[]> {
    return this.enterpriseUsersService.findAll();
  }

  @Get(':id')
  @UseGuards(AccessControlGuard(USER_REGISTRATION))
  async findOne(
    @Param('id') id: string,
  ): Promise<Partial<ResponseEnterpriseUserEntity>> {
    return this.enterpriseUsersService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AccessControlGuard(USER_REGISTRATION))
  update(
    @Param('id') id: string,
    @Body() updateEnterpriseUserDto: UpdateEnterpriseUserDto,
  ): Promise<Partial<EnterpriseUserEntity>> {
    return this.enterpriseUsersService.update(+id, updateEnterpriseUserDto);
  }
}
