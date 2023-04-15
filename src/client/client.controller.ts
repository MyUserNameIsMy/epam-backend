import {
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApplicationEntity } from '../application/entities/application.entity';
import { ApplicationStatusEnum } from '../shared/enum/application-status.enum';
import { Roles } from '../auth/decorator/role.decorator';
import { UserRoleEnum } from '../auth/enum/user-role.enum';
import { RoleGuard } from '../auth/guard/role.guard';

@ApiTags('Client')
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}
  @Roles(UserRoleEnum.CLIENT)
  @UseGuards(RoleGuard)
  @ApiBearerAuth()
  @Post('finish-application/:id')
  async finishApplication(@Param('id') id: string): Promise<ApplicationEntity> {
    return await this.clientService.finishApplication(+id);
  }
}
