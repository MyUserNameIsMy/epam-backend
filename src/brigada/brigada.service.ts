import { Injectable } from '@nestjs/common';
import { BrigadaEntity } from './entities/brigada.entity';
import { ApplicationStatusEnum } from '../shared/enum/application-status.enum';
import { ApplicationPullEntity } from '../operator/entities/application-pull.entity';

@Injectable()
export class BrigadaService {
  async findAll(): Promise<BrigadaEntity[]> {
    return await BrigadaEntity.find();
  }

  async getApplicationPullByStatus(
    brigadaId: number,
    status: ApplicationStatusEnum,
  ): Promise<ApplicationPullEntity[]> {
    return await ApplicationPullEntity.find({
      where: {
        brigada: {
          id: brigadaId,
        },
        brigada_status: status,
      },
    });
  }

  async takeApplication(
    application_pull_id: number,
  ): Promise<ApplicationPullEntity> {
    const application_pull = await ApplicationPullEntity.findOne({
      where: { id: application_pull_id },
    });
    application_pull.start_date = new Date();
    application_pull.brigada_status = ApplicationStatusEnum.IN_PROGRESS;
    return await application_pull.save();
  }

  async finishApplication(
    application_pull_id: number,
  ): Promise<ApplicationPullEntity> {
    const application_pull = await ApplicationPullEntity.findOne({
      where: { id: application_pull_id },
    });
    application_pull.end_date = new Date();
    application_pull.brigada_status = ApplicationStatusEnum.FINISHED;
    return await application_pull.save();
  }
}
