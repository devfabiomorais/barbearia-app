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
import { EnterpriseUserEntity } from './entities/enterprise-user.entity';
import { AccessControlGuard } from 'src/common/guards/access-control.guard';
import { USER_REGISTRATION } from 'src/functionalities';
import { CreateEnterpriseUserDto } from './dto/create-enterprise-user.dto';

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

  @Post()
  @UseGuards(AccessControlGuard(USER_REGISTRATION))
  public async create(
    @Body() createEnterpriseUserDto: CreateEnterpriseUserDto,
  ): Promise<EnterpriseUserEntity> {
    return this.enterpriseUsersService.create(createEnterpriseUserDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(): Promise<EnterpriseUserEntity[]> {
    return this.enterpriseUsersService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string): Promise<EnterpriseUserEntity> {
    return this.enterpriseUsersService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id') id: string,
    @Body() updateEnterpriseUserDto: UpdateEnterpriseUserDto,
  ): Promise<Partial<EnterpriseUserEntity>> {
    return this.enterpriseUsersService.update(+id, updateEnterpriseUserDto);
  }
}
