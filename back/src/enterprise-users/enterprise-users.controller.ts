import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { EnterpriseUsersService } from './enterprise-users.service';
import { UpdateEnterpriseUserDto } from './dto/update-enterprise-user.dto';
import { EnterpriseUserLoginDto } from './dto/login-enterprise-user.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  EnterpriseUserEntity,
  ResponseEnterpriseUserEntity,
  UpdateEnterpriseUserEntityResponse,
} from './entities/enterprise-user.entity';
import { AccessControlGuard } from 'src/common/guards/access-control.guard';
import { USER_REGISTRATION } from 'src/functionalities';
import { CreateEnterpriseUserDto } from './dto/create-enterprise-user.dto';
import { EnterpriseLoginResponse } from 'src/enterprise-users/entities/enterprise-login-response';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
  OmitType,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { IdParamValidatorPipe } from 'src/common/pipes/id-param-validator.pipe';
import { FileSizeValidationPipe } from 'src/common/pipes/file-size-validation.pipe';

@ApiTags('Usuários Corporativos')
@Controller('enterprise-users')
export class EnterpriseUsersController {
  constructor(
    private readonly enterpriseUsersService: EnterpriseUsersService,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'Autenticar um usuário corporativo' })
  @ApiResponse({
    status: 201,
    description:
      'Login realizado com sucesso. Retorna o token de acesso (JWT) e os dados do usuário.',
    type: EnterpriseLoginResponse,
  })
  public async login(
    @Body() loginDto: EnterpriseUserLoginDto,
  ): Promise<EnterpriseLoginResponse> {
    return this.enterpriseUsersService.login(loginDto);
  }

  @Get('details')
  @UseGuards(AuthGuard('enterprise-jwt'))
  @ApiOperation({
    summary: 'Recuperar dados do usuário corporativo autenticado',
  })
  @ApiResponse({
    status: 200,
    description: 'Dados do usuário autenticado retornados com sucesso.',
    type: ResponseEnterpriseUserEntity,
  })
  @ApiResponse({
    status: 401,
    description:
      'Token JWT não fornecido, inválido ou expirado. Acesso não autorizado.',
  })
  @ApiBearerAuth('jwt')
  async userDetails(@Req() request) {
    return this.enterpriseUsersService.findOne(request.user.id);
  }

  @Post()
  @UseGuards(AccessControlGuard(USER_REGISTRATION))
  @ApiOperation({ summary: 'Cadastrar um novo usuário corporativo' })
  @ApiResponse({
    status: 201,
    description: 'Usuário corporativo criado com sucesso.',
    type: EnterpriseUserEntity,
  })
  @ApiBearerAuth('jwt')
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
  @ApiOperation({ summary: 'Listar todos os usuários corporativos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuários corporativos obtida com sucesso.',
    type: [OmitType(ResponseEnterpriseUserEntity, ['profileLogo'])],
  })
  @ApiBearerAuth('jwt')
  findAll(): Promise<Partial<ResponseEnterpriseUserEntity>[]> {
    return this.enterpriseUsersService.findAll();
  }

  @Get(':id')
  @UseGuards(AccessControlGuard(USER_REGISTRATION))
  @ApiOperation({
    summary: 'Buscar um usuário corporativo por ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Dados do usuário corporativo retornados com sucesso.',
    type: ResponseEnterpriseUserEntity,
  })
  @ApiBearerAuth('jwt')
  async findOne(
    @Param('id', IdParamValidatorPipe()) id: string,
  ): Promise<Partial<ResponseEnterpriseUserEntity>> {
    return this.enterpriseUsersService.findOne(+id);
  }

  @Patch('/upload-profile-picture')
  @UseGuards(AuthGuard('enterprise-jwt'))
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Atualiza a foto de perfil do usuário' })
  @ApiResponse({
    status: 200,
    description: 'Foto de perfil atualizada com sucesso.',
    example: {
      message: 'Foto de perfil atualizada com sucesso.',
    },
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Arquivo da foto de perfil',
    required: true,
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiBearerAuth('jwt')
  async uploadLogo(
    @Req() req,
    @UploadedFile(FileSizeValidationPipe()) file: Express.Multer.File,
  ) {
    const userId = req.user.id;
    return this.enterpriseUsersService.uploadProfilePicture(userId, file);
  }

  @Patch(':id')
  @UseGuards(AccessControlGuard(USER_REGISTRATION))
  @ApiOperation({
    summary: 'Atualizar informações de um usuário corporativo por ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Informações do usuário atualizadas com sucesso.',
    type: UpdateEnterpriseUserEntityResponse,
  })
  @ApiBearerAuth('jwt')
  update(
    @Param('id', IdParamValidatorPipe())
    id: number,
    @Body() updateEnterpriseUserDto: UpdateEnterpriseUserDto,
  ): Promise<Partial<EnterpriseUserEntity>> {
    return this.enterpriseUsersService.update(id, updateEnterpriseUserDto);
  }
}
