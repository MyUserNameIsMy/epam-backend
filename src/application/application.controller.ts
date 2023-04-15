import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplicationEntity } from './entities/application.entity';
import { CreateApplicationDto } from './dto/create-application.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/decorator/role.decorator';
import { UserRoleEnum } from '../auth/enum/user-role.enum';
import { RoleGuard } from '../auth/guard/role.guard';
import { ApplicationStatusEnum } from '../shared/enum/application-status.enum';

@ApiTags('Application')
@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Roles(UserRoleEnum.CLIENT)
  @UseGuards(RoleGuard)
  @ApiBearerAuth()
  @Post('apply')
  async apply(
    @Body() applicationDto: CreateApplicationDto,
  ): Promise<ApplicationEntity> {
    return await this.applicationService.create(applicationDto);
  }

  @Roles(UserRoleEnum.CLIENT)
  @UseGuards(RoleGuard)
  @ApiBearerAuth()
  @Get('closed-application')
  async getClosedApplication(@Request() req): Promise<ApplicationEntity[]> {
    return await this.applicationService.getApplicationByStatusForClient(
      +req.user.sub,
      ApplicationStatusEnum.FINISHED,
    );
  }

  @Roles(UserRoleEnum.CLIENT)
  @UseGuards(RoleGuard)
  @ApiBearerAuth()
  @Get('active-application')
  async getActiveApplication(@Request() req): Promise<ApplicationEntity[]> {
    return await this.applicationService.getApplicationByStatusForClient(
      +req.user.sub,
      ApplicationStatusEnum.IN_PROGRESS,
    );
  }
  @Get('all-pending-application')
  async getPendingApplication(): Promise<ApplicationEntity[]> {
    return await this.applicationService.getApplicationByStatus(
      ApplicationStatusEnum.PENDING,
    );
  }
}
