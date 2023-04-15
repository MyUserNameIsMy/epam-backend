import {
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { BrigadaService } from './brigada.service';
import { BrigadaEntity } from './entities/brigada.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApplicationPullEntity } from '../operator/entities/application-pull.entity';
import { ApplicationStatusEnum } from '../shared/enum/application-status.enum';
import { Roles } from '../auth/decorator/role.decorator';
import { UserRoleEnum } from '../auth/enum/user-role.enum';
import { RoleGuard } from '../auth/guard/role.guard';

@ApiTags('Brigada')
@Controller('brigada')
export class BrigadaController {
  constructor(private readonly brigadaService: BrigadaService) {}

  @Get()
  async findAll(): Promise<BrigadaEntity[]> {
    return this.brigadaService.findAll();
  }

  @Get(':id/closed-application')
  async getClosedApplication(
    @Param('id') id: string,
  ): Promise<ApplicationPullEntity[]> {
    return await this.brigadaService.getApplicationPullByStatus(
      +id,
      ApplicationStatusEnum.FINISHED,
    );
  }

  @Get(':id/closed-application')
  async getActiveApplication(
    @Param('id') id: string,
  ): Promise<ApplicationPullEntity[]> {
    return await this.brigadaService.getApplicationPullByStatus(
      +id,
      ApplicationStatusEnum.IN_PROGRESS,
    );
  }

  @Roles(UserRoleEnum.BRIGADA)
  @UseGuards(RoleGuard)
  @ApiBearerAuth()
  @Post('take-application/:id')
  async takeApplication(
    @Param('id') id: string,
  ): Promise<ApplicationPullEntity> {
    return await this.brigadaService.takeApplication(+id);
  }

  @Roles(UserRoleEnum.BRIGADA)
  @UseGuards(RoleGuard)
  @ApiBearerAuth()
  @Post('finish-application/:id')
  async finishApplication(
    @Param('id') id: string,
  ): Promise<ApplicationPullEntity> {
    return await this.brigadaService.finishApplication(+id);
  }
}
