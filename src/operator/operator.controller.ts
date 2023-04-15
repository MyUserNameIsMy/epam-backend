import {
  Body,
  Controller,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { OperatorService } from './operator.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/decorator/role.decorator';
import { UserRoleEnum } from '../auth/enum/user-role.enum';
import { RoleGuard } from '../auth/guard/role.guard';
import { ApplicationEntity } from '../application/entities/application.entity';
import { AssignWorkDto } from './dto/assign-work.dto';

@ApiTags('Operator')
@Controller('operator')
export class OperatorController {
  constructor(private readonly operatorService: OperatorService) {}

  @Roles(UserRoleEnum.OPERATOR)
  @UseGuards(RoleGuard)
  @ApiBearerAuth()
  @Post('take-application/:id')
  async takeApplication(@Param('id') id: string, @Request() req): Promise<any> {
    return await this.operatorService.takeApplication(+id, +req.user.sub);
  }

  @Roles(UserRoleEnum.OPERATOR)
  @UseGuards(RoleGuard)
  @ApiBearerAuth()
  @Post('assign-application')
  async assignApplication(
    @Body() assignWorkDto: AssignWorkDto,
    @Request() req,
  ): Promise<any> {
    return await this.operatorService.assignApplication(assignWorkDto);
  }

  @Roles(UserRoleEnum.OPERATOR)
  @UseGuards(RoleGuard)
  @ApiBearerAuth()
  @Post('finish-application/:id')
  async finishApplication(@Param('id') id: string): Promise<ApplicationEntity> {
    return await this.operatorService.finishApplication(+id);
  }
}
