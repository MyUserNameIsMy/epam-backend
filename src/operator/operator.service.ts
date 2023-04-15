import { ForbiddenException, Injectable } from '@nestjs/common';
import { ApplicationPullEntity } from './entities/application-pull.entity';
import { ApplicationEntity } from '../application/entities/application.entity';
import { OperatorEntity } from './entities/operator.entity';
import { ApplicationStatusEnum } from '../shared/enum/application-status.enum';
import { BrigadaEntity } from '../brigada/entities/brigada.entity';
import { AssignWorkDto } from './dto/assign-work.dto';
import { application } from 'express';

@Injectable()
export class OperatorService {
  async takeApplication(
    application_id: number,
    operator_id: number,
  ): Promise<any> {
    const application_pull = new ApplicationPullEntity();
    const application = await ApplicationEntity.findOne({
      where: { id: application_id },
    });

    application_pull.operator = await OperatorEntity.findOne({
      where: { id: operator_id },
    });

    application_pull.operator_status = ApplicationStatusEnum.IN_PROGRESS;
    await application_pull.save();
    application.status = ApplicationStatusEnum.IN_PROGRESS;
    application.application_pull = application_pull;
    return await application.save();
  }

  async finishApplication(
    application_pull_id: number,
  ): Promise<ApplicationEntity> {
    const application_pull = await ApplicationPullEntity.findOne({
      where: {
        id: application_pull_id,
        brigada_status: ApplicationStatusEnum.FINISHED,
      },
    });
    const application = await ApplicationEntity.findOne({
      where: {
        application_pull: {
          id: application_pull_id,
        },
      },
    });

    if (!application || !application_pull)
      throw new ForbiddenException('Either Client Or Brigada did not finished');

    application_pull.operator_status = ApplicationStatusEnum.FINISHED;
    await application_pull.save();
    return application;
  }

  async assignApplication(
    assignWorkDto: AssignWorkDto,
  ): Promise<ApplicationPullEntity> {
    const application_pull = await ApplicationPullEntity.findOne({
      where: { id: assignWorkDto.application_pull_id },
    });

    application_pull.brigada = await BrigadaEntity.findOne({
      where: { id: assignWorkDto.brigada_id },
    });

    return await application_pull.save();
  }
}
