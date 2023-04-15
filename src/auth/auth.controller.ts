import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { OperatorEntity } from '../operator/entities/operator.entity';
import { RegisterOperatorDto } from './dto/register-operator.dto';
import { RegisterClientDto } from './dto/register-client.dto';
import { ClientEntity } from '../client/entities/client.entity';
import { RegisterBrigadaDto } from './dto/register-brigada.dto';
import { BrigadaEntity } from '../brigada/entities/brigada.entity';
import { UserRoleEnum } from './enum/user-role.enum';
import { Roles } from './decorator/role.decorator';
import { RoleGuard } from './guard/role.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('client'))
  @ApiBody({
    type: LoginDto,
  })
  @Post('user')
  async login(@Request() req): Promise<{ access_token: string }> {
    return this.authService.generateToken(req.user);
  }

  @Roles(UserRoleEnum.OPERATOR)
  @UseGuards(RoleGuard)
  @ApiBearerAuth()
  @Post('register/operator')
  async registerOperator(
    @Body() operatorDto: RegisterOperatorDto,
  ): Promise<OperatorEntity> {
    return this.authService.registerOperator(operatorDto);
  }

  @Post('register/client')
  async registerClient(
    @Body() clientDto: RegisterClientDto,
  ): Promise<ClientEntity> {
    return this.authService.registerClient(clientDto);
  }

  @Roles(UserRoleEnum.OPERATOR)
  @UseGuards(RoleGuard)
  @ApiBearerAuth()
  @Post('register/brigada')
  async registerBrigada(
    @Body() brigadaDto: RegisterBrigadaDto,
  ): Promise<BrigadaEntity> {
    return this.authService.registerBrigada(brigadaDto);
  }
}
