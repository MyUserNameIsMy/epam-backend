import { ForbiddenException, Injectable } from '@nestjs/common';
import { ApplicationEntity } from '../application/entities/application.entity';
import { ApplicationStatusEnum } from '../shared/enum/application-status.enum';

@Injectable()
export class ClientService {
  async finishApplication(application_id: number): Promise<ApplicationEntity> {
    const application = await ApplicationEntity.findOne({
      where: {
        id: application_id,
        application_pull: {
          brigada_status: ApplicationStatusEnum.FINISHED,
        },
      },
    });
    if (!application) throw new ForbiddenException('Brigada not finished');
    application.status = ApplicationStatusEnum.FINISHED;
    return await application.save();
  }
}
